import React from 'react';
import EventDatePicker from "@/components/core/EventSearchForm/EventDatePicker";
import EventFormatPicker from "@/components/core/EventSearchForm/EventFormatPicker";
interface Props {
    className: string
}

function EventSearchForm({className}: Props) {
    return (
        <div className={className}>
            <div className={'flex gap-5'}>
                <EventDatePicker/>
                <EventFormatPicker formats={['Concert', 'Gallery']}/>
            </div>
        </div>
    );
}

export default EventSearchForm;