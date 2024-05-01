import React from 'react';
import EventCard from "@/components/core/EventCard/EventCard";
import {EventTypes, IEventGetRes} from "@/types/event.types";

interface Props {
    events: IEventGetRes[]
}
function EventList({events}: Props) {
    return (
        <>
            {events && events.map((e) => (
                <EventCard
                    title={e.title}
                    start={new Date(e.startTime)}
                    format={e.format}
                    themes={e.themes}
                    location={e.location}
                    img={e.poster}
                    href={`/events/${e.id}`}
                />
                )
            )}
        </>
    );
}

export default EventList;