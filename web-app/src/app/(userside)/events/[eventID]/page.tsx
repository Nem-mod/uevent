// import React from 'react';

import Box from '@/components/utils/Box/Box';
import {Button, Link} from '@nextui-org/react';
import { IEventGetRes } from '@/types/event.types';
import { redirect } from 'next/navigation';
import {Accordion, AccordionItem} from "@nextui-org/accordion";

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
    const fetchedEvent: IEventGetRes = await getEvent(params.eventID);

    return (
        <Box className={'flex gap-20 p-10 max-h-full h-full'}>
            <div className={'w-1/3 p-0 flex'}>
                <img
                    className={'rounded-lg object-cover'}
                    src={fetchedEvent.poster}
                    alt={'Poster'}
                />
            </div>
            <div className={'flex w-3/5 flex-col gap-8'}>w
                <div className={'flex flex-col gap-2'}>
                    <span className={'text-3xl font-extrabold text-black'}>
                        {fetchedEvent.title}
                    </span>
                    <span className={'text-2xl font-bold text-gray-700'}>
                        {fetchedEvent.startTime.toDateString()}
                    </span>
                    <span className={'text-2xl font-bold text-gray-700'}>
                        {fetchedEvent.location}
                    </span>
                </div>
                <div className={'flex flex-row'}>
                    <div className={'flex flex-col gap-3 py-2 pr-10'}>
                        <span className={'text-lg text-gray-700'}>Duration:</span>
                        <span className={'text-lg text-gray-700'}>Format:</span>
                        <span className={'text-lg text-gray-700'}>Themes:</span>
                    </div>
                    <div className={'flex flex-col gap-2 py-2'}>
                        <span className={'text-bold text-lg text-black'}>
                            {fetchedEvent.duration} min
                        </span>
                        <div className={'p-1 px-2 rounded-xl bg-secondary/20 w-fit'}>
                            <Link className={'text-bold text-lg text-black'}>
                                {fetchedEvent.format.name}
                            </Link>
                        </div>
                        <div className={'flex gap-2'}>
                            {fetchedEvent.themes.map(theme => {
                                return(
                                    <div className={'p-1 px-2 rounded-xl bg-secondary/20'}>
                                        <Link className={'text-bold text-lg text-black'}>
                                            {theme.name}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col w-1/2 gap-2'}>
                    <span className={'text-xl font-bold text-gray-700'}>Description:</span>
                    <span className={'w-fit text-lg text-black'}>
                        {fetchedEvent.description}
                    </span>

                </div>
                <Button
                    className={
                        'mt-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                        'w-1/3 text-lg font-semibold hover:border-accent hover:text-white'
                    }
                >
                    Buy a ticket
                </Button>
                {/*<Accordion>*/}
                {/*    <AccordionItem key='1' aria-label={'Basic'} title={'Basic'}>*/}
                {/*        <div>*/}
                {/*            <p>{fetchedEvent.description}</p>*/}
                {/*            <Button*/}
                {/*                className={*/}
                {/*                    'mt-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +*/}
                {/*                    'w-1/3 text-lg font-semibold hover:border-accent hover:text-white'*/}
                {/*                }*/}
                {/*            >*/}
                {/*                Buy a ticket*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    </AccordionItem>*/}
                {/*    <AccordionItem key='2' aria-label={'VIP'} title={'VIP'}>*/}
                {/*        <div>*/}
                {/*            <p>{fetchedEvent.description}</p>*/}
                {/*            <Button*/}
                {/*                className={*/}
                {/*                    'mt-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +*/}
                {/*                    'w-1/3 text-lg font-semibold hover:border-accent hover:text-white'*/}
                {/*                }*/}
                {/*            >*/}
                {/*                Buy a ticket*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    </AccordionItem>*/}
                {/*</Accordion>*/}
            </div>
        </Box>
    );
}

export default Page;
