// import React from 'react';

import Box from '@/components/utils/Box/Box';
import { Button } from '@nextui-org/react';
import { IEventGetRes } from '@/types/IEvent';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        eventID: string;
    };
}

async function getEvent(id: number | string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/event/${id}`);
    if (!response.ok) {
        redirect('/');
    }
    const event: IEventGetRes = await response.json();
    event.startTime = new Date(event.startTime);
    return event;
}

async function Page({ params }: Props) {
    const someFetchedEvent: IEventGetRes = await getEvent(params.eventID);
    return (
        <Box className={'flex gap-20 p-10 max-h-full h-full'}>
            <div className={'w-1/3 p-0 flex'}>
                <img
                    className={'rounded-lg object-cover'}
                    src={someFetchedEvent.poster}
                    alt={'You got 0 bitches'}
                />
            </div>
            <div className={'flex w-3/5 flex-col gap-4'}>
                <span className={'text-3xl font-extrabold text-black'}>
                    {someFetchedEvent.title}
                </span>
                <span className={'text-2xl font-bold text-gray-700'}>
                    {someFetchedEvent.startTime.toDateString()}
                </span>
                <div className={'flex flex-row'}>
                    <div className={'flex flex-col gap-1 py-2 pr-10'}>
                        <span className={'text-lg text-gray-700'}>Duration:</span>
                        <span className={'text-lg text-gray-700'}>Price:</span>
                    </div>
                    <div className={'flex flex-col gap-1 py-2'}>
                        <span className={'text-bold text-lg text-black'}>
                            {someFetchedEvent.duration} No I won't fix this
                        </span>
                        {/*<span className={'text-bold text-lg text-black'}>*/}
                        {/*    {someFetchedEvent.price} Gryvni suka*/}
                        {/*</span>*/}
                    </div>
                </div>
                <span className={'text-xl font-bold text-gray-700'}>Description:</span>
                <div className={'w-1/2'}>
                    <span className={'w-fit text-lg text-black'}>
                        {someFetchedEvent.description}
                    </span>
                </div>
                <Button
                    className={
                        'mt-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                        'w-1/3 text-lg font-semibold hover:border-accent hover:text-white'
                    }
                >
                    Buy Skyrim
                </Button>
            </div>
        </Box>
    );
}

export default Page;
