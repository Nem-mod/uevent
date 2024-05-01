import Slider from '@/components/core/Slider/Slider';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/react';
import EventCard from '@/components/core/EventCard/EventCard';
import { IEventsGetWithPagination } from '@/types/event.types';
import { PAGINATION_OFFSET } from '@/constants/pagination';
import {IEventFormat} from "@/types/theme-format.types";
import FormatEventsList from "@/components/core/FormatEventsList/FormatEventsList";

async function fetchEvents(): Promise<IEventsGetWithPagination> {
    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/event/?`
            + `offset=${PAGINATION_OFFSET}`,
            {
                cache: 'no-cache',
            },
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
    return { count: 0, data: [] };
}

async function fetchFormats(): Promise<IEventFormat[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/event/formats`,
            {
                cache: 'no-cache',
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error)
    }
    return {};
}

export default async function Home() {
    const { data: eventList } = await fetchEvents();
    const formats = await fetchFormats();
    return (
        <div className={'h-full'}>
            <div className={'h-unit-9xl w-full'}>
                <Slider />
            </div>
            <div className={'m-auto mt-12 max-w-screen-xl px-2'}>
                <h2 className={'text-3xl font-bold text-black'}>TOP EVENTS</h2>

                <div className={'mt-5 flex flex-wrap justify-center gap-10'}>
                    {eventList && eventList.map(event => (
                        <EventCard
                            key={event.id}
                            title={event.title}
                            start={new Date(event.startTime)}
                            format={event.format}
                            themes={event.themes}
                            location={event.location}
                            img={event.poster}
                            href={`/events/${event.id}`}
                        />
                    ))}
                </div>

                <div className={'mt-5 flex flex-col gap-20 justify-center'}>
                    {formats.map(format => (<FormatEventsList name={format.name} formatId={format.id}/>))}
                </div>
                <div className={'mt-12 grid w-full place-items-center'}>
                    <Button
                        as={Link}
                        href={'/events'}
                        className={'h-12 w-52 bg-accent text-xl text-white'}
                    >
                        All Events
                    </Button>
                </div>
            </div>
        </div>
    );
}
