'use client';
import SideBar from '@/components/organization/SideBar/SideBar';
import { organizationService } from '@/services/organization.service';
import { useEffect, useState } from 'react';
import { IOrganization } from '@/types/organization.types';
import { useRouter } from 'next/navigation';
import OrganizationProvider from '@/providers/OrganizationProvider';

interface Props {
    children: Readonly<React.ReactNode>,
    params: {
        id: number;
    }
}

function Layout({ children, params: { id } }: Props) {
    const router = useRouter();
    const [organization, setOrganization] = useState<IOrganization>();
    useEffect(() => {
        organizationService.getAllOrganizations().then(res => {
            const org = res.find(obj => obj.id == id);
            if (!org) {
                router.push('/');
            }
            setOrganization(org);
        });
    }, []);

    return (
        <div className={'flex relative'}>
            {organization && (
                <OrganizationProvider orgId={organization.id}>
                    <SideBar organization={organization} />
                    <div className={'w-2/12 px-36'}></div>
                    <main className={'mt-24 px-10 w-full'}>
                        {children}
                    </main>
                </OrganizationProvider>
            )}
        </div>
    );
}

export default Layout;
