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
import React, {useState} from "react";
import {Button} from "@nextui-org/button";

function Page() {
    const [page, setPage] = useState(1);

    const pages = 12

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

    const [members, setMembers] = useState([
        {
            id: "1",
            title: "Dune",
            startTime: "CEO",
            duration: "Active",
        },
        {
            id: "2",
            title: "Zoey Lang",
            startTime: "Technical Lead",
            duration: "Paused",
        },
        {
            id: "3",
            title: "Jane Fisher",
            startTime: "Senior Developer",
            duration: "Active",
        },
        {
            id: "4",
            title: "William Howard",
            startTime: "Community Manager",
            duration: "Vacation",
        },
    ]);

    return (
        <div className={'text-black'}>
            <div className="flex justify-between">
                <h1 className={'text-4xl'}>Events</h1>
                <Button className={'bg-accent text-white'} as={Link}  href={'create-event'}>Add new event</Button>
            </div>
            <Table
                aria-label="Example empty table"
                className={'mt-4'}
                bottomContent={
                    pages > 0 ? (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color={'default'}
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={members}>
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
        </div>
    );
}

export default Page;