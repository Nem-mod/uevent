'use client'

import { Button } from '@nextui-org/button';
import Box from "@/components/utils/Box/Box";
import {DatePicker} from "@nextui-org/date-picker";
import {now, getLocalTimeZone} from "@internationalized/date";
import {Input, Textarea} from "@nextui-org/input";
import React, {useState} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";

function Page() {
    const someFetchedEvent = {
        title: 'VIP event (No bitches)',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores aut blanditiis, cum deleniti dicta facere illo, illum inventore maiores mollitia non provident, quisquam sequi sunt suscipit tempore temporibus ullam!',
        startTime: now(getLocalTimeZone()),
        duration: '120',
        price: '400',
        location: '221B Baker Street',
        poster: 'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp',
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [isEdit, setIsEdit] = useState(false);

    const [title, setTitle] = useState(someFetchedEvent.title)
    const [date, setDate] = useState(someFetchedEvent.startTime);
    const [duration, setDuration] = useState(someFetchedEvent.duration);
    const [price, setPrice] = useState(someFetchedEvent.price);
    const [description, setDescription] = useState(someFetchedEvent.description);


    // TODO: ADD LOGIC
    const handleDelete = () => {

    }

    // TODO: ADD LOGIC
    const handleSubmitEdit = () => {
        const reqBody = {
            title: title,
            startDate: date,
            description: description,
            duration: Number(duration),
            price: Number(price)
        }
        console.log(reqBody);
    }

    const handleEdit = () => {
        if (isEdit) {
            setTitle(someFetchedEvent.title);
            setDescription(someFetchedEvent.description);
            setDuration(someFetchedEvent.duration);
            setPrice(someFetchedEvent.price);
        }
        setIsEdit(!isEdit)
    }

    return (
        <Box className={'flex max-h-screen gap-20 p-10'}>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <span className={'text-black font-semibold text-2xl'}>
                                    Are you sure you want to delete this event?
                                </span>
                                <span className={'text-black font-semibold text-2xl'}>
                                    It will be lost forever
                                </span>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <form onSubmit={handleDelete}>
                                    <Button type={'submit'} color="danger" onPress={onClose}>
                                        Delete
                                    </Button>
                                </form>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className={'w-1/3 p-0 '}>
                <img
                    className={'w-4/5 rounded-lg'}
                    src={someFetchedEvent.poster}
                    alt={'You got 0 bitches'}
                />
            </div>
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
                    label="Event Date"
                    variant="bordered"
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
                <Input
                    type={'number'} label={'Price'}
                    className={'text-3xl font-extrabold text-black'}
                    value={price}
                    onValueChange={setPrice}
                    isDisabled={!isEdit}
                />

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
                    <div className={'flex gap-4'}>
                        <Button
                            onClick={handleEdit}
                            className={
                            'h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            'text-lg font-semibold hover:border-accent hover:text-white w-1/3'
                        }>
                            {isEdit ? "Cancel" : "Edit event"}
                        </Button>
                        <Button
                            onClick={onOpen}
                            color={'danger'}
                            className={
                            'ml-auto h-12 border text-white ' +
                            'text-lg font-semibold w-1/3'
                        }>
                            Delete event
                        </Button>
                    </div>
                    <Button
                        onClick={handleSubmitEdit}
                        className={!isEdit ? "hidden" :
                            'h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            'text-lg font-semibold hover:border-accent hover:text-white w-1/3'
                        }
                    >
                        Save changes
                    </Button>
                </div>
            </div>
        </Box>
    );
}

export default Page;
