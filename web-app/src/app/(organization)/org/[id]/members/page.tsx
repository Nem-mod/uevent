'use client'

import React, {useState} from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import Box from "@/components/utils/Box/Box";
import {Button} from '@nextui-org/button';
import {Input} from "@nextui-org/input";


function Page() {

    const [members, setMembers] = useState([
        {
            key: "1",
            name: "Tony Reichert",
            role: "CEO",
            status: "Active",
        },
        {
            key: "2",
            name: "Zoey Lang",
            role: "Technical Lead",
            status: "Paused",
        },
        {
            key: "3",
            name: "Jane Fisher",
            role: "Senior Developer",
            status: "Active",
        },
        {
            key: "4",
            name: "William Howard",
            role: "Community Manager",
            status: "Vacation",
        },
    ]);

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "role",
            label: "ROLE",
        },
        {
            key: "status",
            label: "STATUS",
        },
    ];

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>();

    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    // TODO: ADD LOGIC
    const handeAddMember = () => {
        const reqBody = {
            name: name,
            role: role,
            status: status,
            key: `${Number(members[members.length - 1].key) + 1}`
        }

        setMembers([...members, reqBody])
    }

    // TODO: ADD LOGIC
    const handleDelete = () => {
        console.log(selectedKeys)
    }

    return (
        <Box className={'flex flex-col gap-2 pl-4'}>
            <span
                className={'text-5xl font-extrabold text-black mr-auto ml-12'}
            >
                Add new member
            </span>
            <Box className={'flex flex-col rounded-xl w-2/5 gap-2'}>
                <Input
                    type={'text'} label={'Name'}
                    className={'text-3xl font-extrabold text-black'}
                    value={name}
                    onValueChange={setName}
                />
                <Input
                    type={'text'} label={'Role'}
                    className={'text-3xl font-extrabold text-black'}
                    value={role}
                    onValueChange={setRole}
                />
                <Input
                    type={'text'} label={'Status'}
                    className={'text-3xl font-extrabold text-black'}
                    value={status}
                    onValueChange={setStatus}
                />

                <Button
                    onClick={handeAddMember}
                    className={
                        'h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                        'text-lg font-semibold hover:border-accent hover:text-white w-1/3'
                    }
                >
                    Submit
                </Button>
            </Box>
            <span
                className={'text-5xl font-extrabold text-black mr-auto ml-12'}
            >
                Members
            </span>
            <Table
                aria-label="Example table with dynamic content"
                selectionMode={'multiple'}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={members}>
                    {(item) => (
                        <TableRow key={item.key}>
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
                onClick={handleDelete}
                color={'danger'}
                className={
                    'mr-auto h-12 border text-white ' +
                    'text-lg font-semibold w-fit'
                }>
                Delete selected
            </Button>
        </Box>
    );
}

export default Page;