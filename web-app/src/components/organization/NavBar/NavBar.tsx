"use client"
import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import NavBarItem from "@/components/organization/NavBarItem/NavBarItem";
import { IOrganization } from '@/types/organization.types';
interface Props {
    className?: string;
    organization: IOrganization;
}
function NavBar({className, organization}: Props) {
    return (
        <nav className={className}>
            <Listbox
                aria-label="Example with disabled actions"
            >
                <ListboxItem key={`events`} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem href={`/org/${organization.id}/events`} title={'Events'}/>
                </ListboxItem>
                <ListboxItem key={'create-event'} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem href={`org/${organization.id}/create-events`} title={'Create Event'}/>
                </ListboxItem>
                <ListboxItem key={'members'} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem href={`/org/${organization.id}/members`} title={'Members'}/>
                </ListboxItem>
                <ListboxItem key={'main'} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem href={'/'} title={'Main page'}/>
                </ListboxItem>

            </Listbox>
        </nav>
    );
}

export default NavBar;