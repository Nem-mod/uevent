import EventDatePicker from '@/components/core/EventSearchForm/EventDatePicker';
import EventFormatPicker from '@/components/core/EventSearchForm/EventFormatPicker';
import EventTitleSearch from '@/components/core/EventSearchForm/EventTitleSearch';

interface Props {
    className: string;
}

function EventSearchForm({ className }: Props) {


    return (
        <div className={className}>
            <div className={'flex  w-full items-center gap-5'}>
                <div className={'flex-grow basis-1'}>
                    <EventTitleSearch/>
                </div>
                <div className={'flex gap-5'}>
                    <EventDatePicker />
                    <EventFormatPicker />
                </div>
            </div>
        </div>
    );
}

export default EventSearchForm;
