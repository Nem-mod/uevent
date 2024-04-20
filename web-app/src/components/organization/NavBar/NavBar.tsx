"use client"
import React from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import NavBarItem from "@/components/organization/NavBarItem/NavBarItem";

interface Props {
    className?: string
}
function NavBar({className}: Props) {
    return (
        <nav className={className}>
            <Listbox
                aria-label="Example with disabled actions"
            >
                <ListboxItem key={'events'} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem title={'Events'}/>
                </ListboxItem>
                <ListboxItem key={'members'} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem title={'Members'}/>
                </ListboxItem>
                <ListboxItem key={'analytics'} variant={'light'} className={'hover:bg-accentSecond'}>
                    <NavBarItem title={'Analytics'}/>
                </ListboxItem>

            </Listbox>
        </nav>
    );
}

export default NavBar;