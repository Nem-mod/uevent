import Box from '@/components/utils/Box/Box';
import { Button, Link } from '@nextui-org/react';
import { IEventGetRes } from '@/types/event.types';
import { redirect } from 'next/navigation';
import BuyTicketForm from '@/components/core/BuyTicketForm/BuyTicketForm';

interface Props {
    params: {
        eventID: string;
    };
}

async function getEvent(id: number | string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/event/${id}`, { cache: 'no-cache' });
    if (!response.ok) {
        redirect('/');
    }
    const event: IEventGetRes = await response.json();
    // event.startTime = new Date(event.startTime);
    return event;
}

async function Page({ params }: Props) {
    const fetchedEvent: IEventGetRes = await getEvent(params.eventID);

    return (
        <Box className={'mt-10 flex gap-20 p-10 h-[50rem]'}>
            <div className={'w-1/3 p-0 flex'}>
                <img
                    className={'rounded-lg object-cover'}
                    src={fetchedEvent.poster}
                    alt={'Poster'}
                />
            </div>
            <div className={'flex basis-2/5 md:flex-col lg:flex-row gap-5 grow mt-5'}>

                <div className={'flex basis-8/12 grow-0 flex-col gap-8'}>
                    <div className={'flex flex-col gap-2'}>
                    <span className={'text-3xl font-extrabold text-black'}>
                        {fetchedEvent.title}
                    </span>
                        <span className={'text-2xl font-bold text-gray-700'}>
                        {new Date(fetchedEvent.startTime).toDateString()}
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
                                <Link
                                    href={`/events/?format=${fetchedEvent.format.id}`}
                                    className={'text-bold text-lg text-black'}>
                                    {fetchedEvent.format.name}
                                </Link>
                            </div>
                            <div className={'flex gap-2'}>
                                {fetchedEvent.themes.map(theme => {
                                    return (
                                        <div className={'p-1 px-2 rounded-xl bg-secondary/20'}>
                                            <Link
                                                isDisabled
                                                className={'text-bold text-lg text-black'}
                                            >
                                                {theme.name}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <span className={'text-xl font-bold text-gray-700'}>Description:</span>
                        <span className={'text-lg text-black text-pretty'}>{fetchedEvent.description}</span></div>
                </div>
                <div className={'basis-2/5'}>
                    <BuyTicketForm ticketTypes={fetchedEvent.ticketsStatistic} eventId={fetchedEvent.id} />
                </div>
            </div>
        </Box>
    );
}

export default Page;

//
//
// {/*<Accordion>*/}
// {/*    <AccordionItem key='1' aria-label={'Basic'} title={'Basic'}>*/}
// {/*        <div>*/}
// {/*            <p>{fetchedEvent.description}</p>*/}
// {/*            <Button*/}
// {/*                className={*/}
// {/*                    'mt-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +*/}
// {/*                    'w-1/3 text-lg font-semibold hover:border-accent hover:text-white'*/}
// {/*                }*/}
// {/*            >*/}
// {/*                Buy a ticket*/}
// {/*            </Button>*/}
// {/*        </div>*/}
// {/*    </AccordionItem>*/}
// {/*    <AccordionItem key='2' aria-label={'VIP'} title={'VIP'}>*/}
// {/*        <div>*/}
// {/*            <p>{fetchedEvent.description}</p>*/}
// {/*            <Button*/}
// {/*                className={*/}
// {/*                    'mt-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +*/}
// {/*                    'w-1/3 text-lg font-semibold hover:border-accent hover:text-white'*/}
// {/*                }*/}
// {/*            >*/}
// {/*                Buy a ticket*/}
// {/*            </Button>*/}
// {/*        </div>*/}
// {/*    </AccordionItem>*/}
// {/*</Accordion>*/}