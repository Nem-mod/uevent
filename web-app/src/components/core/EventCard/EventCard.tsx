import React from 'react';

interface CardTypes {
    title: string,
    start: Date,
    price: string,
    tag: string,
    address: string,
    img?: string
}
function EventCard({title, start, price, tag, address, img}: CardTypes) {
    return (
        <div className={'flex flex-row border-2 rounded-xl border-gray/70 shadow-xl w-xl'}>
            <div className={'max-w-unit-40'}>
                <img className={'rounded-l-lg'} src={img} alt="This is an image"/>
            </div>
            <div className={'flex flex-col py-2 px-4 gap-4 bg-transparent pl-8 pr-20'}>
                <div className={'flex flex-col gap-2'}>
                    <span className={'text-black text-m font-semibold'}>
                        {start.toDateString()}
                    </span>
                    <span className={'text-gray-500 text-m'}>
                        {tag}
                    </span>
                </div>
                <div className={'flex flex-col my-2'}>
                    <span className={'text-l text-black font-bold'}>
                        {title}
                    </span>
                </div>
                <div className={'flex flex-col gap-2'}>
                    <span className={'text-gray-500 text-m'}>
                        {address}
                    </span>
                    <span className={'text-gray-500 text-m'}>
                        {price}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
