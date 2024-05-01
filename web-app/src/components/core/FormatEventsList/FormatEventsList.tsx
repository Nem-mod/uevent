import React, {useEffect} from 'react';
import {IEventsGetWithPagination} from "@/types/event.types";
import {PAGINATION_OFFSET} from "@/constants/pagination";
import EventCard from "@/components/core/EventCard/EventCard";
import Box from "@/components/utils/Box/Box";

interface Props {
    name: string
    formatId: number | string
}

async function fetchEvents(formatId: number | string): Promise<IEventsGetWithPagination> {
    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/event/?`
            + `page=0&`
            + `offset=${PAGINATION_OFFSET}&`
            + `format=${formatId}`,
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
async function FormatEventsList({name, formatId}: Props) {

    const events = await fetchEvents(formatId)
    console.log(events)

    return (
        <Box>
            <span className={'text-black text-semibold text-4xl'}>{name}</span>
            <div className={'mt-10 flex gap-4 flex-wrap gap-6'}>
                {events.data && events.data.map(event => (
                    <EventCard
                        title={event.title}
                        start={new Date(event.startTime)}
                        format={event.format}
                        themes={event.themes}
                        location={event.location}
                        href={`/events/${event.id}`}
                        img={event.poster}
                    />)
                )}
            </div>
        </Box>
    );
}

export default FormatEventsList;