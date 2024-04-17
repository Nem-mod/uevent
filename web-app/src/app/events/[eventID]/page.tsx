// import React from 'react';

import Box from "@/components/utils/Box/Box";
import {Button} from "@nextui-org/react"

function Page({params}) {

    const someFetchedEvent = {
        title: 'VIP event (No bitches)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores aut blanditiis, cum deleniti dicta facere illo, illum inventore maiores mollitia non provident, quisquam sequi sunt suscipit tempore temporibus ullam!',
        startTime: new Date(),
        duration: 120 * 60,
        price: 400,
        location: '221B Baker Street',
        poster: 'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp'
    }

    return (
        <Box className={'flex p-10 gap-20 max-h-screen'}>
            <div className={'p-0 w-1/3 '}>
                <img className={'w-4/5 rounded-lg'} src={someFetchedEvent.poster} alt={'You got 0 bitches'}/>
            </div>
            <div className={'flex flex-col w-3/5 gap-4'}>
                <span className={'text-black text-3xl font-extrabold'}>{someFetchedEvent.title}</span>
                <span className={'text-gray-700 text-2xl font-bold'}>{someFetchedEvent.startTime.toDateString()}</span>
                <div className={'flex flex-row'}>
                    <div className={'flex flex-col gap-1 py-2 pr-10'}>
                        <span className={'text-gray-700 text-lg'}>Duration:</span>
                        <span className={'text-gray-700 text-lg'}>Price:</span>
                    </div>
                    <div className={'flex flex-col gap-1 py-2'}>
                        <span className={'text-black text-lg text-bold'}>{someFetchedEvent.duration} No I won't fix this</span>
                        <span className={'text-black text-lg text-bold'}>{someFetchedEvent.price} Gryvni suka</span>
                    </div>
                </div>
                <span className={'text-gray-700 text-xl font-bold'}>Description:</span>
                <div className={'w-1/2'}>
                    <span className={'text-black text-lg w-fit'}>{someFetchedEvent.description}</span>
                </div>
                <Button className={
                    'mt-auto bg-accent h-12 text-white border-primary border hover:bg-accent ' +
                    'hover:border-accent text-lg font-semibold w-1/3 hover:text-white'
                    }
                >
                    Buy Skyrim
                </Button>
            </div>
        </Box>
    );
}

export default Page;