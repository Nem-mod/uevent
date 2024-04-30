'use client'

import { Button } from '@nextui-org/button';
import Box from "@/components/utils/Box/Box";
import {DatePicker} from "@nextui-org/date-picker";
import {CalendarDateTime, parseDateTime} from "@internationalized/date";
import {Input, Textarea} from "@nextui-org/input";
import React, {useEffect, useState} from "react";
import {
    getKeyValue, Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination, Table, TableBody, TableCell, TableColumn,
    TableHeader, TableRow,
    useDisclosure,
    Select, SelectItem,
} from "@nextui-org/react";
import {ICreateEventAndTickets, IEventGetRes} from "@/types/event.types";
import {eventService} from "@/services/event.service";
import EditEventForm from "@/components/core/EditEventForm/EditEventForm";



function Page(props) {


    const [fetchedEvent, setFetchedEvent] = useState<IEventGetRes>();

    useEffect(() => {
        eventService.getEvent(Number(props.params.eventId)).then(res => {
            setFetchedEvent(res)
        })
    }, []);



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
            key: "overallCount",
            label: "OVERALL COUNT",
        },
        {
            key: "soldCount",
            label: "SOLD COUNT",
        },
    ];

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
                <span className={'text-xl font-bold text-gray-700'}>Tickets:</span>
                {/*{fetchedEvent?.ticketsStatistic && <Table*/}
                {/*    aria-label="Example empty table"*/}
                {/*    className={'mt-4'}*/}
                {/*>*/}
                {/*    <TableHeader columns={columns}>*/}
                {/*        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}*/}
                {/*    </TableHeader>*/}
                {/*    <TableBody items={fetchedEvent.ticketsStatistic}>*/}
                {/*        {(item) => (*/}
                {/*            <TableRow*/}
                {/*                // key={item.id}*/}
                {/*                className={''}*/}
                {/*            >*/}
                {/*                {(columnKey) => <TableCell*/}
                {/*                    className={'text-black'}*/}
                {/*                >*/}
                {/*                    {getKeyValue(item, columnKey)}*/}
                {/*                </TableCell>}*/}
                {/*            </TableRow>*/}
                {/*        )}*/}
                {/*    </TableBody>*/}
                {/*</Table>}*/}
            </Box>

    );
}

export default Page;
