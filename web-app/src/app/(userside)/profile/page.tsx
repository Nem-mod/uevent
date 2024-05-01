'use client';

import React, { useEffect, useState } from 'react';
import Box from '@/components/utils/Box/Box';
import { Button, Link } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { IUserRegisterAndAuthRes } from '@/types/user.types';
import { useUserProvider } from '@/providers/UserProvider';

function Page() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const [user, setUser] = useUserProvider();

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
        })
    };
    const columns = [
        {
            key: 'title',
            label: 'TITLE',
        },
        {
            key: 'startDate',
            label: 'START DATE',
        },
        {
            key: 'location',
            label: 'LOCATION',
        },
    ];

    const tickets = [
        {
            id: '1',
            title: 'All bitches here',
            startDate: new Date().toDateString(),
            location: 'London is the capital of Great Britain',
        },
        {
            id: '2',
            title: 'No bitches D:',
            startDate: new Date().toDateString(),
            location: 'London is the capital of Great Britain',
        },
        {
            id: '3',
            title: 'Still no bitches',
            startDate: new Date().toDateString(),
            location: 'London is the capital of Great Britain',
        },
        {
            id: '4',
            title: 'Nigga balls',
            startDate: new Date().toDateString(),
            location: 'London is the capital of Great Britain',
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
                        {/*<Button*/}
                        {/*    onPress={onOpen}*/}
                        {/*    color={'danger'}*/}
                        {/*    className={*/}
                        {/*        'mt-auto ml-auto h-12 text-white ' +*/}
                        {/*        'w-fit text-lg font-semibold hover:border-accent hover:text-white'*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    Delete Account*/}
                        {/*</Button>*/}
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
                    <Table aria-label='Purchase history'>
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={tickets}>
                            {(item) => (
                                <TableRow
                                    key={item.id}
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
                </Box>
            )}
        </div>
    );
}

export default Page;