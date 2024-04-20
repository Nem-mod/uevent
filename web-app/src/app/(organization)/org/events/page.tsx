'use client'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination} from "@nextui-org/react";
import {useState} from "react";

function Page() {
    const [page, setPage] = useState(1);

    const pages = 12

    return (
        <div className={'text-black'}>
            <h1 className={'text-4xl'}>Events</h1>
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
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="2" href={'#'} className={'bg-accent text-white rounded-md'}>
                        <TableCell>Zoey Lang</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Jane Fisher</TableCell>
                        <TableCell>Senior Developer</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>William Howard</TableCell>
                        <TableCell>Community Manager</TableCell>
                        <TableCell>Vacation</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default Page;