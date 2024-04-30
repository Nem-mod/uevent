import React from 'react';
import {ITicket} from "@/types/ticket.types";
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

interface Props {
    tickets: ITicket[]
    page: number
    setPage: React.Dispatch<React.SetStateAction<number | undefined>>
}
function TicketsTable({tickets, page, setPage}: Props) {

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