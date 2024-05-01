'use client';
import React, { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@nextui-org/react';
import { ChevronDownIcon } from '@nextui-org/shared-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useThemesAndFormatsProvider } from '@/providers/ThemesAndFormatsProvider';

interface Props {
    onSubmit?: (data: any) => void;
    title?: string;
}

// FIXME: fix select state after reload the page
function EventFormatPicker({ title }: Props) {
    const { formatList } = useThemesAndFormatsProvider() || { formatList: []};
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const [selected, setSelected] = useState<string>(
        decodeURIComponent(searchParams.get('format') || ''),
    );
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    const handleSubmit = () => {
        const params = new URLSearchParams(searchParams);

        if (!selected) {
            params.delete('format');
        } else {
            params.set('format', selected);
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
                        label={'Formats'}
                        className={'mt-6'}
                        placeholder="Select event formats"
                        selectionMode="multiple"
                    >
                        {formatList &&
                            formatList.map((format) => (
                                <SelectItem className={'text-black'} key={format.id} value={format.id}>
                                    {format.name}
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
