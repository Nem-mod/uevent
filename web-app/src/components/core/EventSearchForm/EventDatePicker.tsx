'use client';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { ChevronDownIcon } from '@nextui-org/shared-icons';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    onSubmit?: (data: any) => void;
    title?: string;
}

function EventDatePicker({ title }: Props) {
    const [selected, setSelected] = useState<Date[]>();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSubmit = () => {
        if (!selected) return;
        const params = new URLSearchParams(searchParams);
        let datesSelected = selected.map(e => {
            return e.toISOString();
        }).join(',');
        params.set('date', datesSelected);

        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <Popover placement="bottom-start" showArrow={true}>
            <PopoverTrigger>
                <div className={'flex items-center'}>
                    <span className={'px-2 font-mono text-xl'}>{title || '16.04.2024'}</span>
                    <ChevronDownIcon fontSize={20} />
                </div>
            </PopoverTrigger>
            <PopoverContent className={'rounded-none'}>
                <div className="px-1 py-2 text-black">
                    <div className="text-xl font-bold">Select days</div>
                    <DayPicker
                        mode="multiple"
                        selected={selected}
                        onSelect={setSelected}
                        modifiersStyles={{
                            selected: {
                                backgroundColor: '#7743DB',
                            },
                        }}
                    />
                    <Button
                        onClick={handleSubmit}
                        className={'float-right bg-accent font-mono text-white'}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default EventDatePicker;
