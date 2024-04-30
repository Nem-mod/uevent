'use client'

import { Button } from '@nextui-org/button';
import Box from "@/components/utils/Box/Box";
import {DatePicker} from "@nextui-org/date-picker";
import {CalendarDateTime, parseDateTime} from "@internationalized/date";
import {Input, Textarea} from "@nextui-org/input";
import React, {useEffect, useState} from "react";
import {
    getKeyValue,
    Pagination, Table, TableBody, TableCell, TableColumn,
    TableHeader, TableRow,
    useDisclosure,
    PropsOf,
} from "@nextui-org/react";
import {ICreateEventAndTickets, IEventGetRes} from "@/types/event.types";
import {eventService} from "@/services/event.service";
import {ITicket, ITicketsPaginated} from "@/types/ticket.types";
import {ticketService} from "@/services/ticket.service";

import EditEventForm from "@/components/core/EditEventForm/EditEventForm";

function Page(props: any) {


    const [fetchedEvent, setFetchedEvent] = useState<IEventGetRes>();
    const [tickets, setTickets] = useState<ITicket[]>();
    const [page, setPage] = useState<number>();

    useEffect(() => {
        eventService.getEvent(Number(props.params.eventId)).then(res => {
            setFetchedEvent(res)
        })
        ticketService.getEventTickets(Number(props.params.eventId), 0, 25).then(res => {
            setTickets(res.data)
            setPage(0)
        })
    }, []);





    return (
            <Box className={'max-h-screen p-10'}>

                <div className={'flex'}>
                    <div className={'w-1/3 p-0 '}>
                        <img
                            className={'w-4/5 rounded-lg'}
                            src={fetchedEvent?.poster}
                            alt={'You got 0 bitches'}
                        />
                    </div>

                    {fetchedEvent && <EditEventForm fetchedEvent={fetchedEvent}/>}
                </div>

            </Box>

    );
}

export default Page;
