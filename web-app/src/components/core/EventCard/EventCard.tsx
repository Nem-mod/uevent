import React from 'react';
import {Link} from "@nextui-org/react";

interface CardTypes {
    title: string;
    start: Date;
    price: string | number;
    tag: string;
    address: string;
    img?: string;
    href?: string
}

function EventCard({title, start, price, tag, address, img, href}: CardTypes) {
    return (
        <div className={'border-gray/70 w-xl flex flex-row rounded-xl border-2 shadow-xl'}>
            <Link href={href}>
                <div className={'max-w-unit-40'}>
                    <img className={'rounded-l-lg'} src={img} alt="This is an image"/>
                </div>
                <div className={'flex flex-col gap-4 bg-transparent px-4 py-2 pl-8 pr-20'}>
                    <div className={'my-2 flex flex-col'}>
                        <span className={'text-l font-bold text-black text-xl'}>{title}</span>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <span className={'text-m font-semibold text-black'}>
                        {start.toDateString()}
                    </span>
                        <span className={'text-m text-gray-500'}>{tag}</span>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <span className={'text-m text-gray-500'}>{address}</span>
                        <span className={'text-m text-gray-500'}>{price}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default EventCard;
