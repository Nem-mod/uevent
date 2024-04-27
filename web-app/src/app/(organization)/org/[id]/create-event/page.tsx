'use client'
import InputEventPoster from "@/components/organization/InputEventPoster/InputEventPoster";
import React, {useState} from "react";
import {Input, Textarea} from "@nextui-org/input";
import {DatePicker} from "@nextui-org/date-picker";
import {now, getLocalTimeZone, today} from "@internationalized/date";
import {
    getKeyValue, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, useDisclosure
} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {uploadPoster} from "@/actions/gcs/upload-poster";
import Box from "@/components/utils/Box/Box";

const formats = ['Concert', 'Gallery']

function Page() {
    const [posterImg, setPosterImg] = useState<File>();
    const uploadFile = async () => {
        if (!posterImg)
            return;
        try {
            let formData = new FormData();
            const timestamp = Date.now();
            formData.append("image", posterImg, `${timestamp}.webp`);
            const res = await uploadPoster(formData);
        } catch (error) {
            console.log(error)
        }
    }

    const [ticketsTypes, setTicketsTypes] = useState([
        {
            key: "1",
            description: "lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen lorem ipsum dolor sit amen",
            type: "Basic",
            price: "400",
            amount: '120',
        },
    ]);

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

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
        <div className={'w-full flex flex-row'}>
            <div className={'flex flex-col w-1/2'}>
                <h1 className={'text-black text-4xl'}>Create event</h1>
                <div className={'mt-10 gap-10 text-black'}>
                    <InputEventPoster value={posterImg} onChange={setPosterImg} className={'w-4/5'}/>

                    <div className={'w-4/5'}>
                        <form className={''}>
                            <Input
                                isRequired
                                type={'text'}
                                label={'Title'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}
                            />
                            <Textarea
                                isRequired
                                type={'text'}
                                label={'Description'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}
                            />
                            <DatePicker
                                isRequired
                                label={"Event Date"}
                                variant={"underlined"}
                                hideTimeZone
                                size={'lg'}
                                color={'primary'}
                                showMonthAndYearPickers
                                minValue={today(getLocalTimeZone())}
                                defaultValue={now(getLocalTimeZone())}
                            />

                            <Input
                                type={'text'}
                                label={'Estimate duration in minutes'}
                                size={'lg'}
                                radius={'sm'}
                                variant={'underlined'}
                                color={'primary'}
                            />

                            <Select
                                label={'Format'}
                                placeholder={"Select event formats"}
                                variant={'underlined'}
                                color={'primary'}
                                size={'lg'}
                            >
                                {formats &&
                                    formats.map((format) => (
                                        <SelectItem className={'text-black'} key={format} value={format}>
                                            {format}
                                        </SelectItem>
                                    ))}
                            </Select>
                            <div className={'flex gap-2 content-stretch'}>
                                <Button
                                    className={'bg-accent text-white mt-5'}
                                    size={'lg'} onClick={uploadFile}
                                >
                                    Submit
                                </Button>
                                <Button
                                    onClick={onOpen}
                                    variant={'bordered'} size={'lg'}
                                    className={'border-accent text-accent mt-5 hover:bg-accent/10'}
                                >
                                    Preview
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


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
                    selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <h1 className={'text-black text-8xl'}>Here will be a very cool poster</h1>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
}

export default Page;