'use client';
import InputEventPoster from '@/components/organization/InputEventPoster/InputEventPoster';
import React, { FormEvent, useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { DatePicker } from '@nextui-org/date-picker';
import { getLocalTimeZone, now, today, ZonedDateTime } from '@internationalized/date';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
    Selection, Link
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { uploadPoster } from '@/actions/gcs/upload-poster';
import { useOrganizationProvider } from '@/providers/OrganizationProvider';
import { ICreateEventAndTickets, ICreateEventTicket } from '@/types/event.types';
import TicketForm from '@/components/organization/TicketForm/TicketForm';
import { eventService } from '@/services/event.service';
import { useThemesAndFormatsProvider } from '@/providers/ThemesAndFormatsProvider';
import { useRouter } from 'next/navigation';
import Box from "@/components/utils/Box/Box";

function Page() {
    const router = useRouter();
    const organizationId = useOrganizationProvider();
    const themesAndFormats = useThemesAndFormatsProvider();

    if (!themesAndFormats)
        return <></>

    const { formatList, themesList} = themesAndFormats;
    const [posterImg, setPosterImg] = useState<File>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [startTime, setStartTime] = useState<ZonedDateTime>(now(getLocalTimeZone()));
    const [duration, setDuration] = useState<number>(1);
    const [location, setLocation] = useState('');
    const [format, setFormat] = useState<number>();
    const [themes, setThemes] = useState<Set<number>>();
    const [tickets, setTickets] = useState<ICreateEventTicket[]>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const uploadFile = async () => {
        if (!posterImg)
            return;
        try {
            let formData = new FormData();
            const timestamp = Date.now();
            formData.append('image', posterImg, `${timestamp}.webp`);
            return await uploadPoster(formData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const imgURL = await uploadFile();

        if (!imgURL || !title || !description || !format || !startTime || !themes || tickets?.length === 0)
            return;

        console.log(tickets);
        // @ts-ignore
        const themesArray = [...themes].map(e => Number(e));
        const data: ICreateEventAndTickets = {
            title: title,
            description: description,
            startTime: startTime.toDate().toISOString(),
            duration: duration,
            locationStr: location,
            format: format,
            themes: themesArray,
            poster: imgURL,
            tickets: tickets
        }
        const res = await eventService.createEvent(data, organizationId);
        // router.push('/');
        console.log(data)
    };

    return (
        <div className={'w-full flex flex-row'}>
            <div className={'flex flex-col w-1/2'}>
                <h1 className={'text-black text-4xl'}>Create event</h1>
                <div className={'mt-10 gap-10 text-black'}>
                    <InputEventPoster value={posterImg} onChange={setPosterImg} className={'w-4/5'} />

                    <div className={'w-4/5'}>
                        <form onSubmit={handleSubmit}>
                            <Input
                                isRequired
                                type={'text'}
                                label={'Title'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                isRequired
                                type={'text'}
                                label={'Description'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}

                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <DatePicker
                                isRequired
                                label={'Event Date'}
                                variant={'underlined'}
                                hideTimeZone
                                size={'lg'}
                                color={'primary'}
                                showMonthAndYearPickers
                                minValue={today(getLocalTimeZone())}
                                value={startTime}
                                onChange={(value) => setStartTime(value)}
                            />

                            <Input
                                type={'text'}
                                label={'Estimate duration in minutes'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}
                                value={`${duration}`}
                                onChange={e => setDuration(+e.target.value)}
                            />

                            <Input
                                type={'text'}
                                label={'Location event take place at'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}
                                value={`${location}`}
                                onChange={e => setLocation(e.target.value)}
                            />

                            <Select
                                isRequired={true}
                                label={'Format'}
                                placeholder={'Select event formats'}
                                variant={'underlined'}
                                color={'primary'}
                                size={'lg'}
                                selectedKeys={format ? [format] : []}
                                onChange={(e) => setFormat(+e.target.value)}
                            >
                                {formatList &&
                                    formatList.map((format) => (
                                        <SelectItem className={'text-black'} key={format.id} value={format.id}>
                                            {format.name}
                                        </SelectItem>
                                    ))}
                            </Select>

                            <Select
                                isRequired={true}
                                selectionMode={'multiple'}
                                label={'Themes'}
                                placeholder={'Select event themes'}
                                variant={'underlined'}
                                color={'primary'}
                                size={'lg'}
                                // selectedKeys={format ? [format] : []}
                                // onChange={(e) => console.log(+e.target.value)}
                                onSelectionChange={(keys: Selection) => setThemes(keys as Set<number>)}
                            >
                                {themesList &&
                                    themesList.map((theme) => (
                                        <SelectItem
                                            className={'text-black'}
                                            key={theme.id}
                                            value={theme.id}
                                            onSelect={(e) => console.log(e)}
                                        >
                                            {theme.name}
                                        </SelectItem>
                                    ))}
                            </Select>
                            <div className={'flex gap-2 content-stretch'}>
                                <Button
                                    type={'submit'}
                                    className={'bg-accent text-white mt-5'}
                                    size={'lg'}
                                >
                                    Submit
                                </Button>
                                <Button
                                    onClick={onOpen}
                                    variant={'bordered'} size={'lg'}
                                    className={'border-accent text-accent mt-5 hover:bg-accent/10'}
                                >
                                    Preview
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <TicketForm setEventTickets={setTickets} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
                            <ModalBody>
                                {/*<Box className={'mt-20 flex gap-20 p-10'}>*/}
                                {/*    <div className={'w-1/3 p-0 flex'}>*/}
                                {/*        <img*/}
                                {/*            className={'rounded-lg object-cover'}*/}
                                {/*            src={imgURL}*/}
                                {/*            alt={'Poster'}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    <div className={'flex basis-2/5 md:flex-col lg:flex-row gap-5 grow mt-5'}>*/}

                                {/*        <div className={'flex basis-8/12 grow-0 flex-col gap-8'}>*/}
                                {/*            <div className={'flex flex-col gap-2'}>*/}
                                {/*                <span className={'text-3xl font-extrabold text-black'}>*/}
                                {/*                    {title}*/}
                                {/*                </span>*/}
                                {/*                <span className={'text-2xl font-bold text-gray-700'}>*/}
                                {/*                    {new Date(startTime.toString()).toDateString()}*/}
                                {/*                </span>*/}
                                {/*                <span className={'text-2xl font-bold text-gray-700'}>*/}
                                {/*                    {`${location}`}*/}
                                {/*                </span>*/}
                                {/*            </div>*/}
                                {/*            <div className={'flex flex-row'}>*/}
                                {/*                <div className={'flex flex-col gap-3 py-2 pr-10'}>*/}
                                {/*                    <span className={'text-lg text-gray-700'}>Duration:</span>*/}
                                {/*                    <span className={'text-lg text-gray-700'}>Format:</span>*/}
                                {/*                    <span className={'text-lg text-gray-700'}>Themes:</span>*/}
                                {/*                </div>*/}
                                {/*                <div className={'flex flex-col gap-2 py-2'}>*/}
                                {/*                <span className={'text-bold text-lg text-black'}>*/}
                                {/*                    {duration} min*/}
                                {/*                </span>*/}
                                {/*                    <div className={'p-1 px-2 rounded-xl bg-secondary/20 w-fit'}>*/}
                                {/*                        <Link className={'text-bold text-lg text-black'}>*/}
                                {/*                            {}*/}
                                {/*                        </Link>*/}
                                {/*                    </div>*/}
                                {/*                    <div className={'flex gap-2'}>*/}
                                {/*                        {fetchedEvent.themes.map(theme => {*/}
                                {/*                            return (*/}
                                {/*                                <div className={'p-1 px-2 rounded-xl bg-secondary/20'}>*/}
                                {/*                                    <Link className={'text-bold text-lg text-black'}>*/}
                                {/*                                        {theme.name}*/}
                                {/*                                    </Link>*/}
                                {/*                                </div>*/}
                                {/*                            );*/}
                                {/*                        })}*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className={'flex flex-col gap-2'}>*/}
                                {/*                <span className={'text-xl font-bold text-gray-700'}>Description:</span>*/}
                                {/*                <span className={'text-lg text-black text-pretty'}>{fetchedEvent.description}</span></div>*/}
                                {/*        </div>*/}
                                {/*        <div className={'basis-2/5'}>*/}
                                {/*            <BuyTicketForm ticketTypes={fetchedEvent.ticketsStatistic} />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</Box>*/}
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' variant='light' onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
}

export default Page;