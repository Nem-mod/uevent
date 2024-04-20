// import React from 'react';

import Box from '@/components/utils/Box/Box';
import { Button } from '@nextui-org/react';

function Page() {
    const someFetchedEvent = {
        title: 'VIP event (No bitches)',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores aut blanditiis, cum deleniti dicta facere illo, illum inventore maiores mollitia non provident, quisquam sequi sunt suscipit tempore temporibus ullam!',
        startTime: new Date(),
        duration: 120 * 60,
        price: 400,
        location: '221B Baker Street',
        poster: 'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp',
    };

    return (
        <Box className={'flex max-h-screen gap-20 p-10'}>
            <div className={'w-1/3 p-0 '}>
                <img
                    className={'w-4/5 rounded-lg'}
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
                        <span className={'text-bold text-lg text-black'}>
                            {someFetchedEvent.price} Gryvni suka
                        </span>
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
