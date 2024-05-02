import React from 'react';
import {Link} from "@nextui-org/react";
import {IEventFormat, IEventTheme} from "@/types/theme-format.types";

interface CardTypes {
    title: string;
    start: Date;
    format: IEventFormat;
    themes: IEventTheme[];
    location: string;
    img?: string;
    href?: string
}

function EventCard({title, start, format, location, themes, img, href}: CardTypes) {
    return (
        <Link href={href} className={'w-96'}>
            <div className={'border-gray/70 flex flex-row rounded-xl border-2 shadow-xl h-40 w-96 '}>
                <div className={'flex w-1/3'}>
                    <img className={'object-cover rounded-l-xl'} src={img} alt="This is an image"/>
                </div>
                <div className={'flex flex-col bg-transparent py-2 pl-8 pr-20 w-2/3 justify-around'}>
                    {/*<div className={'my-2 flex flex-col'}>*/}
                        <span className={'text-l font-bold text-black text-xl'}>{title}</span>
                    {/*</div>*/}
                    {/*<div className={'flex flex-col gap-2'}>*/}
                        <span className={'text-m font-semibold text-black'}>
                            {start && start.toDateString()}
                        </span>
                        <span className={'text-m text-gray-500'}>{format.name}</span>
                        <span
                            className={'text-m text-gray-500'}
                        >
                            {themes.map(theme => theme.name).join(', ')}
                        </span>
                        <span className={'text-m text-gray-500'}>{location}</span>
                    {/*</div>*/}
                </div>
            </div>
        </Link>
    );
}

export default EventCard;
