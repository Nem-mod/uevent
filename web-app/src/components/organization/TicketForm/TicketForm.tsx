import React, { useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const ticketTypes = [
    {
        key: "1",
        description: "lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen",
        type: "Basic",
        price: "400",
        amount: '120',
    },
]

const columns = [
    {
        key: "description",
        label: "DESCRIPTION",
    },
    {
        key: "type",
        label: "TYPE",
    },
    {
        key: "price",
        label: "PRICE",
    },
    {
        key: "amount",
        label: "AMOUNT",
    },
];


function TicketForm() {
    const [ticketsTypes, setTicketsTypes] = useState(ticketTypes);

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>();

    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    // TODO: ADD LOGIC
    const handeAddTickets = () => {
        const reqBody = {
            description: description,
            type: type,
            price: price,
            amount: amount,
            key: `${Number(ticketsTypes[ticketsTypes.length - 1].key) + 1}`
        }

        setTicketsTypes([...ticketsTypes, reqBody])
    }

    // TODO: ADD LOGIC
    const handleDelete = () => {
        console.log(selectedKeys)
        const deleted = ticketsTypes.filter(e => {
            return !(selectedKeys && selectedKeys.has(e.key))
        })
        setTicketsTypes(prevState => deleted)
    }

    const bottomContent = (
        <>
            <Button
                onClick={handleDelete}
                color={'danger'}
                className={
                    'ml-auto h-12 border text-white ' +
                    'text-lg font-semibold w-fit'
                }
            >
                Delete selected
            </Button>
        </>
    )

    return (


        <div className={'flex flex-col gap-6 w-1/2'}>
            <h1
                className={'text-4xl text-black'}
            >
                Add tickets type
            </h1>
            <div className={'flex flex-col rounded-xl w-3/5 gap-2 items-baseline'}>
                <Textarea
                    value={description} onValueChange={setDescription}
                    type={'text'} label={'Description'}
                    size={'lg'}
                    radius={'sm'}
                    variant={'underlined'}
                    color={'primary'}
                    className={'text-black'}
                    isRequired
                />
                <Input
                    value={type} onValueChange={setType}
                    type={'text'} label={'Type'}
                    size={'lg'}
                    radius={'sm'}
                    variant={'underlined'}
                    color={'primary'}
                    className={'text-black'}
                    isRequired
                />
                <Input
                    value={price} onValueChange={setPrice}
                    type={'text'} label={'Price'}
                    size={'lg'}
                    radius={'sm'}
                    variant={'underlined'}
                    color={'primary'}
                    className={'text-black'}
                    isRequired
                />
                <Input
                    value={amount} onValueChange={setAmount}
                    type={'text'} label={'Amount'}
                    size={'lg'}
                    radius={'sm'}
                    variant={'underlined'}
                    color={'primary'}
                    className={'text-black'}
                    isRequired
                />

                <Button
                    onClick={handeAddTickets}
                    size={'lg'}
                    className={'bg-accent text-white mt-4'}
                >
                    Add
                </Button>
            </div>
            <h1 className={'text-4xl text-black'}>
                Tickets Types
            </h1>
            <Table
                aria-label="Example table with dynamic content"
                selectionMode={'multiple'}
                bottomContent={bottomContent}
                selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys as any}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={ticketsTypes}>
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
        </div>
    );
}

export default TicketForm;