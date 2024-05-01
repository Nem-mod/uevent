import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { DatePicker } from '@nextui-org/date-picker';
import { CalendarDateTime, getLocalTimeZone, parseDateTime } from '@internationalized/date';
import { IEventGetRes, IUpdateEvent } from '@/types/event.types';
import { useRouter } from 'next/navigation';
import { useOrganizationProvider } from '@/providers/OrganizationProvider';
import { eventService } from '@/services/event.service';


interface Props {
    fetchedEvent: IEventGetRes;
}

function EditEventForm({ fetchedEvent }: Props) {

    const router = useRouter();
    const organizationId = useOrganizationProvider();
    const [title, setTitle] = useState(fetchedEvent.title);
    const [date, setDate] = useState<CalendarDateTime>(parseDateTime(fetchedEvent.startTime.slice(0, 16)));
    const [duration, setDuration] = useState(`${fetchedEvent.duration}`);
    const [description, setDescription] = useState(fetchedEvent.description);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isEdit, setIsEdit] = useState(false);


    // TODO: ADD LOGIC
    const handleDelete = () => {

    };

    // TODO: ADD LOGIC
    const handleSubmitEdit = async () => {
        const event: IUpdateEvent = {
            id: Number(fetchedEvent.id),
            title: title,
            startTime: date.toDate(getLocalTimeZone()).toISOString(),
            description: description,
            duration: Number(duration),
        };
        const res = await eventService.updateEvent(event, organizationId);
        setIsEdit(false);
    };

    const handleEdit = () => {
        if (isEdit) {
            setTitle(fetchedEvent.title);
            setDate(parseDateTime(fetchedEvent.startTime.slice(0, 16)));
            setDuration(`${fetchedEvent.duration}`);
            setDescription(fetchedEvent.description);
        }
        setIsEdit(!isEdit);
    };

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
                            <ModalBody>
                                <span className={'text-black font-semibold text-2xl'}>
                                    Are you sure you want to delete this event?
                                </span>
                                <span className={'text-black font-semibold text-2xl'}>
                                    It will be lost forever
                                </span>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' variant='light' onPress={onClose}>
                                    Cancel
                                </Button>
                                <form onSubmit={handleDelete}>
                                    <Button type={'submit'} color='danger' onPress={onClose}>
                                        Delete
                                    </Button>
                                </form>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div className={'flex w-3/5 flex-col gap-4 [&>*]:w-3/5'}>
                <Input
                    type={'text'} label={'Title'}
                    className={'text-3xl font-extrabold text-black'}
                    value={title}
                    onValueChange={setTitle}
                    isDisabled={!isEdit}
                />
                <DatePicker
                    value={date} onChange={setDate}
                    isReadOnly={!isEdit}
                    label='Event Date'
                    variant='bordered'
                    hideTimeZone
                    showMonthAndYearPickers
                />

                <Input
                    type={'number'} label={'Duration (in minutes)'}
                    className={'text-3xl font-extrabold text-black'}
                    value={duration}
                    onValueChange={setDuration}
                    isDisabled={!isEdit}
                />
                <div className={'flex'}>
                    <div className={'flex flex-col gap-3 py-2 pr-10 mt-1'}>
                        <span className={'text-lg text-gray-700'}>Format:</span>
                        <span className={'text-lg text-gray-700'}>Themes:</span>
                    </div>
                    <div className={'flex flex-col gap-2 py-2'}>
                        <div className={'p-1 px-2 rounded-xl bg-secondary/20 w-fit'}>
                            <span className={'text-bold text-lg text-black'}>
                                {fetchedEvent.format.name}
                            </span>
                        </div>
                        <div className={'flex gap-2'}>
                            {fetchedEvent.themes.map(theme => {
                                return (
                                    <div className={'p-1 px-2 rounded-xl bg-secondary/20'}>
                                        <span className={'text-bold text-lg text-black'}>
                                            {theme.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <span className={'text-xl font-bold text-gray-700'}>Description:</span>
                <div className={''}>
                    <Textarea
                        size={'lg'}
                        className={'text-2xl text-black'}
                        value={description} onValueChange={setDescription}
                        isReadOnly={!isEdit}
                        maxRows={3}
                    />
                </div>
                <div className={'mr-auto flex flex-col gap-4'}>
                    <div className={'flex gap-4 flex-row-reverse'}>
                        <Button
                            onClick={onOpen}
                            color={'danger'}
                            className={
                                'h-12 border text-white ' +
                                'text-lg font-semibold w-1/3'
                            }>
                            Delete event
                        </Button>
                        <Button
                            onClick={handleEdit}
                            className={
                                'h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                                'text-lg font-semibold hover:border-accent hover:text-white w-1/3'
                            }>
                            {isEdit ? 'Cancel' : 'Edit event'}
                        </Button>
                        <Button
                            onClick={handleSubmitEdit}
                            className={!isEdit ? 'hidden' :
                                'h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                                'text-lg font-semibold hover:border-accent hover:text-white w-1/3'
                            }
                        >
                            Save changes
                        </Button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default EditEventForm;