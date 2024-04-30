'use client';
import {
    DropdownItem,
    DropdownMenu,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import {
    TagUser,
    Server,
    Flash,
    Activity,
    Lock,
    Scale,
    ChevronDown,
} from '@nextui-org/shared-icons';
import { Dropdown, DropdownTrigger } from '@nextui-org/dropdown';
import { IUserRegisterAndAuthRes } from '@/types/user.types';
import { organizationService } from '@/services/organization.service';
import { IOrganization } from '@/types/organization.types';
import { useUserProvider } from '@/providers/UserProvider';

const icons = {
    chevron: <ChevronDown fill='currentColor' size={16} />,
    scale: <Scale className='text-warning' fill='currentColor' size={30} />,
    lock: <Lock className='text-success' fill='currentColor' size={30} />,
    activity: <Activity className='text-secondary' fill='currentColor' size={30} />,
    flash: <Flash className='text-primary' fill='currentColor' size={30} />,
    server: <Server className='text-success' fill='currentColor' size={30} />,
    user: <TagUser className='text-danger' fill='currentColor' size={30} />,
};

export function CustomNavBar() {
    const [_, setIsMenuOpen] = useState(false);
    const [user] = useUserProvider();
    const [organizations, setOrganizations] = useState<IOrganization[]>([]);

    useEffect(() => {
        organizationService.getAllOrganizations().then(res => {
            setOrganizations(res);
        }).catch(err => {
            setOrganizations([])
        });
    }, [user])

    return (
        <Navbar
            className={'bg-accent'}
            shouldHideOnScroll={true}
            onMenuOpenChange={setIsMenuOpen}
            isBordered
            maxWidth={'xl'}
        >
            <NavbarContent>
                <NavbarMenuToggle className={'sm:hidden'} />
                <NavbarBrand>
                    <Link href={'/'} className='font-bold text-inherit text-white'>
                        CUMEVENT
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
                {organizations.length != 0 ? (

                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className='text-md bg-transparent p-0 text-white data-[hover=true]:bg-transparent'
                                    endContent={icons.chevron}
                                    radius='sm'
                                    variant='light'
                                >
                                    Organizations
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label='ACME features'
                                className='w-[340px]'
                                itemClasses={{
                                    base: 'gap-4',
                                }}
                                items={organizations}
                            >
                                {item => (
                                    <DropdownItem
                                        key={item.name}
                                        className={'text-black'}
                                        description={item.description && `${item.description.slice(0, 10)}...`}
                                        startContent={icons.flash}
                                        href={`/org/${item.id}`}
                                    >
                                        {item.name}
                                    </DropdownItem>
                                )}

                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ): (
                    <NavbarItem isActive>
                        <Link href={'/new-organization'} aria-current='page' className={'text-white'}>
                            Create an organization
                        </Link>
                    </NavbarItem>
                )}

                <NavbarItem isActive>
                    <Link href={'/events'} aria-current='page' className={'text-white'}>
                        Events
                    </Link>
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify='end'>
                {(user ? (
                    <NavbarItem className='hidden lg:flex'>
                        <Link href={'/profile'} className={'text-secondary'}>
                            {user?.email}
                        </Link>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className='hidden lg:flex'>
                            <Link href={'/signin'} className={'text-secondary'}>
                                Login
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                className={'hover:text-white'}
                                color='primary'
                                href='/signup'
                                variant='flat'
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>

                    </>
                ))}
            </NavbarContent>
        </Navbar>
    );
}
