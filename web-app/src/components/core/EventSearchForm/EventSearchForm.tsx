import React from 'react';
import EventDatePicker from '@/components/core/EventSearchForm/EventDatePicker';
import EventFormatPicker from '@/components/core/EventSearchForm/EventFormatPicker';
import { SearchIcon } from '@nextui-org/shared-icons';
import { Input } from '@nextui-org/input';

interface Props {
    className: string;
}

function EventSearchForm({ className }: Props) {
    return (
        <div className={className}>
            <div className={'flex  w-full items-center gap-5'}>
                <div className={'flex-grow basis-1'}>
                    <Input
                        classNames={{
                            base: 'h-10',
                            mainWrapper: 'h-full',
                            input: '',
                            inputWrapper: 'h-full font-normal',
                        }}
                        placeholder="Type to search..."
                        size="lg"
                        startContent={<SearchIcon className={'text-accent'} />}
                        type="search"
                    />
                </div>
                <div className={'flex gap-5'}>
                    <EventDatePicker />
                    <EventFormatPicker formats={['Concert', 'Gallery']} />
                </div>
            </div>
        </div>
    );
}

export default EventSearchForm;
