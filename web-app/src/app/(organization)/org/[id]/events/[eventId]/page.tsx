'use client'

import { Button } from '@nextui-org/button';
import Box from "@/components/utils/Box/Box";
import {DatePicker} from "@nextui-org/date-picker";
import {parseDateTime} from "@internationalized/date";
import {Input, Textarea} from "@nextui-org/input";
import React, {useState} from "react";
import {
    getKeyValue,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination, Table, TableBody, TableCell, TableColumn,
    TableHeader, TableRow,
    useDisclosure
} from "@nextui-org/react";
import {ICreateEventAndTickets} from "@/types/event.types";



function Page() {
    const someFetchedEvent: ICreateEventAndTickets = {
        title: 'VIP event (No bitches)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores aut blanditiis, cum deleniti dicta facere illo, illum inventore maiores mollitia non provident, quisquam sequi sunt suscipit tempore temporibus ullam!',
        startTime: '2022-02-03T09:15',
        duration: 120,
        location: '221B Baker Street',
        poster: 'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp',
        format: {
            id: 1,
            name: 'Movie'
        },
        themes: [
            {
                id: 1,
                name: 'Action'
            },
            {
                id: 2,
                name: 'Thriller'
            }
        ],
        tickets: [
            {
                ticket: {
                    type: 'Basic',
                    description: 'A ticket for basic middle row seat',
                    cost: 140,
                },
                amount: 80
            },
            {
                ticket: {
                    type: 'VIP',
                    description: 'VIP ticket back seats with additional bitches',
                    cost: 300
                },
                amount: 20
            }
        ]
    };

    let i = 0;
    const parsedEvent = {
        title: someFetchedEvent.title,
        startTime: parseDateTime(someFetchedEvent.startTime),
        duration: `${someFetchedEvent.duration}`,
        description: someFetchedEvent.description,
        poster: someFetchedEvent.poster,
        tickets: [someFetchedEvent.tickets?.forEach(ticket => {
            i++;
            return {
                type: ticket.ticket.type,
                description: ticket.ticket.description,
                cost: `${ticket.ticket.cost}`,
                amount: `${ticket.amount}`,
                id: `${i}`
            }
        })],

    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [isEdit, setIsEdit] = useState(false);

    const [title, setTitle] = useState(parsedEvent.title)
    const [date, setDate] = useState(parsedEvent.startTime);
    const [duration, setDuration] = useState(parsedEvent.duration);
    const [description, setDescription] = useState(parsedEvent.description);
    const [ticketsConst, setTicketsConst] = useState(
        [someFetchedEvent.tickets?.forEach(ticket => {
        i++;
        return {
            type: ticket.ticket.type,
            description: ticket.ticket.description,
            cost: `${ticket.ticket.cost}`,
            amount: `${ticket.amount}`,
            id: `${i}`
        }
    })]);


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
            // price: Number(tickets)
        }
        console.log(reqBody);
    }

    const handleEdit = () => {
        if (isEdit) {
            setTitle(parsedEvent.title);
            setDescription(parsedEvent.description);
            setDuration(parsedEvent.duration);
        }
        setIsEdit(!isEdit)
    }

    const columns = [
        {
            key: "type",
            label: "TYPE",
        },
        {
            key: "description",
            label: "DESCRIPTION",
        },
        {
            key: "cost",
            label: "COST",
        },
        {
            key: "amount",
            label: "AMOUNT",
        },
    ];

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
                    src={parsedEvent.poster}
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
                    <span className={'text-xl font-bold text-gray-700'}>Tickets:</span>
                    <Table
                        aria-label="Example empty table"
                        className={'mt-4'}
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={ticketsConst as any}>
                            {(item) => (
                                <TableRow
                                    key={item.id}
                                    className={'bg-accent text-white rounded-md'}
                                >
                                    {(columnKey) => <TableCell
                                        className={'text-black'}
                                    >
                                        {getKeyValue(item, columnKey)}
                                    </TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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
