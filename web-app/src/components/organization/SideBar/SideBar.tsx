import React from 'react';
import Navbar from "@/components/organization/NavBar/NavBar";

function SideBar() {
    return <div className={'bg-accent w-2/12 h-screen static'}>
        <Navbar className={'mt-24 px-3'}/>
    </div>;
}

export default SideBar;
