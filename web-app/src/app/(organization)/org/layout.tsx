import React from 'react';
import SideBar from "@/components/organization/SideBar/SideBar";

function Layout({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={'flex'}>
            <SideBar/>
            <main className={'mt-24 px-10 w-full'}>
                {children}
            </main>
        </div>
    );
}

export default Layout;
