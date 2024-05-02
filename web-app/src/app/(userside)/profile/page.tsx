'use client';

import { useEffect, useState } from 'react';
import Box from '@/components/utils/Box/Box';
import { Button, Link } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useUserProvider } from '@/providers/UserProvider';
import { ticketService } from '@/services/ticket.service';

export enum TicketStatus {
    AVAILABLE,
    PROCESSING,
    SOLD,
    COMPOSTED,
}

function Page() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const [user, setUser] = useUserProvider();
    const [sentResetPass, setSentResetPass] = useState(false);
    const [tickets, setTickets] = useState();

    useEffect(() => {
        ticketService.getUsersTickets().then(res => {
            console.log(res);
            setTickets(res.data.map((item: any) => {
                return {
                    ...item,
                    status: TicketStatus[item.status]
                }
            }));
        });
    }, [])
    const handleDelete = () => {
        console.log('Account deleted');
        router.replace('/');
    };

    const handleLogOut = async () => {
        authService.logout().then(() => {
            if (setUser) {
                setUser(null);
            }
            router.push('/');
        });
    };

    const handleResetPassword = async () => {
        if (!user?.email)
            return;
        const res = authService.sendRecoverPassword(user?.email);
        setSentResetPass(true);
    };

    const columns = [
        {
            key: 'type',
            label: 'TITLE',
        },
        {
            key: 'description',
            label: 'Description',
        },
        {
            key: 'status',
            label: 'Status',
        },
        {
            key: 'cost',
            label: 'Cost',
        },
    ];

    return (
        <div className={'p-10 grid place-items-center'}>
            <span className={'text-6xl font-extrabold text-black m-auto pt-4 mb-6'}>
                Profile
            </span>
            {user && (

                <Box className={'flex w-4/6 flex-col gap-4 p-8 py-14'}>

                <span className={'text-3xl font-extrabold text-black'}>
                    {user.username}
                </span>
                    <span className={'text-2xl font-bold text-gray-700'}>
                    {user.email}
                </span>
                    <div className={'flex flex-col ml-auto gap-2'}>
                        {/*<Button*/}
                        {/*    className={*/}
                        {/*        'mt-auto ml-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +*/}
                        {/*        'w-fit text-lg font-semibold hover:border-accent hover:text-white'*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    Reset password*/}
                        {/*</Button>*/}
                        <Button
                            href={'/profile/edit'}
                            as={Link}
                            className={
                                'mt-auto ml-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                                'w-fit text-lg font-semibold hover:border-accent hover:text-white'
                            }
                        >
                            Edit profile
                        </Button>

                        <Button
                            onClick={handleLogOut}
                            color={'danger'}
                            className={
                                'mt-auto ml-auto h-12 text-white ' +
                                'w-fit text-lg font-semibold hover:border-accent hover:text-white'
                            }
                        >
                            Log out
                        </Button>

                        <Button
                            onPress={handleResetPassword}
                            color={'danger'}
                            className={
                                'mt-auto ml-auto h-12 text-white ' +
                                'w-fit text-lg font-semibold hover:border-accent hover:text-white'
                            }
                        >
                            Reset Password
                        </Button>
                        {sentResetPass && (
                            <span className={'text-black text-xl'}>We sent reset password link to your email</span>
                        )}

                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
                                        <ModalBody>
                                        <span className={'text-black font-semibold text-2xl'}>
                                            Are you sure you want to delete your account?
                                        </span>
                                            <span className={'text-black font-semibold text-2xl'}>
                                            It will be lost forever
                                        </span>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color='primary' variant='light' onPress={onClose}>
                                                Cancel
                                            </Button>
                                            <form onSubmit={handleDelete}>
                                                <Button type={'submit'} color='danger' onPress={onClose}>
                                                    Delete
                                                </Button>
                                            </form>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <span className={'text-5xl font-extrabold text-black'}>
                Purchase history:
            </span>
                    {tickets && (

                        <Table aria-label='Purchase history'>
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={tickets}>
                                {(item: any) => (
                                    <TableRow
                                        key={item.id}
                                    >
                                        {(columnKey) => <TableCell
                                            key={item.id + getKeyValue(item, columnKey)}
                                            className={'text-black'}
                                        >
                                            {getKeyValue(item, columnKey)}
                                        </TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}

                </Box>
            )}
        </div>
    );
}

export default Page;