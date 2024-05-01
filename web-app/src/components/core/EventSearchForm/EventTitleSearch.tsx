'use client';
import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@nextui-org/shared-icons';
import { Input } from '@nextui-org/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function EventTitleSearch() {
    const [search, setSearch] = useState<string>();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (search)
                params.set('search', search);
            else
                params.delete('search');
            replace(`${pathname}?${params.toString()}`);
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [search]);
    return (
        <>
            <Input
                classNames={{
                    base: 'h-10',
                    mainWrapper: 'h-full',
                    input: '',
                    inputWrapper: 'h-full font-normal',
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to search..."
                size="lg"
                startContent={<SearchIcon className={'text-accent'} />}
                type="search"
            />
        </>
    );
}

export default EventTitleSearch;