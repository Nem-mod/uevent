import React from 'react';
import Navbar from '@/components/organization/NavBar/NavBar';
import { IOrganization } from '@/types/organization.types';

interface Props {
    organization: IOrganization;
}

function SideBar({ organization }: Props) {
    return (
        <div className={'bg-accent w-2/12 h-svh  fixed'}>
            <Navbar organization={organization} className={'mt-24 px-3'} />
        </div>
    );
}

export default SideBar;
