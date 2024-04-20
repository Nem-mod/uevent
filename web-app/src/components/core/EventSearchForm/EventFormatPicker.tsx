'use client';
import React, { useState } from 'react';
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
} from '@nextui-org/react';
import { ChevronDownIcon } from '@nextui-org/shared-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    onSubmit?: (data: any) => void;
    title?: string;
    formats: string[];
}

// FIXME: fix select state after reload the page
function EventFormatPicker({ title, formats }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const [selected, setSelected] = useState<string>(
        decodeURIComponent(searchParams.get('format') || ''),
    );
    console.log(selected);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    const handleSubmit = () => {
        const params = new URLSearchParams(searchParams);

        if (!selected) {
            params.delete('format');
        } else {
            let formatSelected = encodeURIComponent(JSON.stringify(selected.split(',')));
            params.set('format', formatSelected);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Popover placement="bottom-start" showArrow={true}>
            <PopoverTrigger>
                <div className={'flex items-center'}>
                    <span className={'px-2 font-mono text-xl'}>{title || 'Formats'}</span>
                    <ChevronDownIcon fontSize={20} />
                </div>
            </PopoverTrigger>
            <PopoverContent className={'w-64 rounded-none'}>
                <div className="w-full px-1 py-2 text-black">
                    <div className="text-xl font-bold">Select event types</div>
                    <Select
                        onChange={(e) => handleChange(e)}
                        label={'arial-label'}
                        className={'mt-6'}
                        placeholder="Select event formats"
                        selectionMode="multiple"
                    >
                        {formats &&
                            formats.map((format) => (
                                <SelectItem className={'text-black'} key={format} value={format}>
                                    {format}
                                </SelectItem>
                            ))}
                    </Select>
                    <Button
                        onClick={handleSubmit}
                        className={'float-right mt-5 w-full bg-accent font-mono text-white'}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default EventFormatPicker;
