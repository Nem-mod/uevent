'use client'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Link,
    getKeyValue
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {Button} from "@nextui-org/button";
import {useOrganizationProvider} from "@/providers/OrganizationProvider";
import {organizationService} from "@/services/organization.service";
import {IEventGetRes} from "@/types/event.types";

function Page() {
    const [page, setPage] = useState(1);

    const pages = 12

    const orgID = useOrganizationProvider();

    const [events, setEvents] = useState<IEventGetRes[]>()

    useEffect(() => {
        organizationService.getAllOrgEvents(orgID).then(res => {
            setEvents(res.data)
        })
    }, []);

    const columns = [
        {
            key: "title",
            label: "TITLE",
        },
        {
            key: "startTime",
            label: "START TIME",
        },
        {
            key: "duration",
            label: "DURATION",
        },
    ];


    return (
        <div className={'text-black'}>
            <div className="flex justify-between">
                <h1 className={'text-4xl'}>Events</h1>
                <Button className={'bg-accent text-white'} as={Link}  href={'create-event'}>Add new event</Button>
            </div>
            {events && <Table
                aria-label="Example empty table"
                className={'mt-4 [&>*]:bg-accent/20 [&>*]:rounded-3xl [&>*]:[&>*]:bg-accent/20'}
                isStriped={true}
                // selectionMode="single"
                // bottomContent={
                //     pages > 0 ? (
                //         <div className="flex w-fit m-auto justify-center bg-accent/20 rounded-3xl">
                //             <Pagination
                //                 isCompact
                //                 showControls
                //                 showShadow
                //                 color={'default'}
                //                 page={page}
                //                 total={pages}
                //                 onChange={(page) => setPage(page)}
                //             />
                //         </div>
                //     ) : null
                // }
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={events}>
                    {(item) => (
                        <TableRow
                            href={`/org/${orgID}/events/${item.id}`}
                            key={item.id}
                            className={'hover:bg-secondary/20 ease-in-out rounded-xl border-white cursor-pointer'}
                        >
                            {(columnKey) => <TableCell
                                className={'text-black'}
                            >
                                {getKeyValue(item, columnKey)}
                            </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>}
        </div>
    );
}

export default Page;