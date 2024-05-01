'use client'

import React, {useEffect} from 'react';
import {ITicket} from "@/types/ticket.types";
import {
    getKeyValue,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";

interface Props {
    tickets: ITicket[]
    page: number
    pages: number
    setPage: React.Dispatch<React.SetStateAction<number | undefined>>
}
function TicketsTable({tickets, page, pages, setPage}: Props) {

    useEffect(() => {
        console.log(tickets)
    }, [tickets]);

    const columns = [
        {
            key: "id",
            label: "ID"
        },
        {
            key: "type",
            label: "TYPE",
        },
        {
            key: "cost",
            label: "COST",
        },
    ];

    return (
        <>
            <span className={'text-xl font-bold text-gray-700'}>Tickets:</span>
            <Table
                aria-label="Example empty table"
                className={'mt-4'}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={tickets}>
                    {(item) => (
                        <TableRow
                            key={item.id}
                            className={''}
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
        </>
    );
}

export default TicketsTable;