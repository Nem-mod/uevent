import React from 'react';
import EventCard from "@/components/core/EventCard/EventCard";
import {Event} from "@/types/event";

interface Props {
    events: Event[]
}
function EventList({events}: Props) {
    return (
        <>
            {events && events.map((e) => (
                <EventCard
                    title={e.title}
                    start={e.startTime}
                    price={100}
                    tag={'Bitch nigga'}
                    address={e.location}
                    img={e.poster}
                    href={`/events/${e.id}`}
                />
                )
            )}
        </>
    );
}

export default EventList;