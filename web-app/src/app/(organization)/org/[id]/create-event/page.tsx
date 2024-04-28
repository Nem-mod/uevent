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
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { uploadPoster } from '@/actions/gcs/upload-poster';
import { useOrganizationProvider } from '@/providers/OrganizationProvider';
import { ICreateEventAndTickets, IEventFormat } from '@/types/IEvent';
import TicketForm from '@/components/organization/TicketForm/TicketForm';
import { eventService } from '@/services/event.service';

const formats: IEventFormat[] = [
    {
        id: 1,
        name: 'Concert',
    },
];

function Page() {
    const organizationId = useOrganizationProvider();
    const [posterImg, setPosterImg] = useState<File>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [startTime, setStartTime] = useState<ZonedDateTime>(now(getLocalTimeZone()));
    const [duration, setDuration] = useState<number>(1);
    const [format, setFormat] = useState<number>();

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

        if (!imgURL || !title || !description || !format || !startTime)
            return;

        const data: ICreateEventAndTickets = {
            title: title,
            description: description,
            startTime: startTime.toDate(),
            duration: duration,
            format: format,
            // FIXME: Add new input for themes
            themes: [1, 2],
            poster: imgURL
        }
        const res =await eventService.createEvent(data, organizationId);
        console.log(res);
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
                                {formats &&
                                    formats.map((format) => (
                                        <SelectItem className={'text-black'} key={format.id} value={format.id}>
                                            {format.name}
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

            <TicketForm />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
                            <ModalBody>
                                <h1 className={'text-black text-8xl'}>Here will be a very cool poster</h1>
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