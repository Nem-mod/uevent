import React from 'react';
import {Link} from "@nextui-org/react";

interface Props {
    title: string,
    href: string
}
function NavBarItem({title, href}: Props) {
    return (
            <Link href={href} aria-current={'page'} className={'w-full text-white text-xl'}>{title}</Link>
    );
}

export default NavBarItem;