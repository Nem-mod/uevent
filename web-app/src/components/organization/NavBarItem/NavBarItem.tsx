import React from 'react';
import {Link} from "@nextui-org/react";

interface Props {
    title: string
}
function NavBarItem({title}: Props) {
    return (
            <Link href={'org/events'} aria-current={'page'} className={'w-full text-white text-xl'}>{title}</Link>
    );
}

export default NavBarItem;