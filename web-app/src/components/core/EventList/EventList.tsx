import React from 'react';
import EventCard from "@/components/core/EventCard/EventCard";
import {IEvent} from "@/types/IEvent";

interface Props {
    events: IEvent[]
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