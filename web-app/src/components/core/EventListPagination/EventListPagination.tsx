"use client"
import {Pagination} from "@nextui-org/react";
import {useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface Props {
    currentPage: number | undefined,
    pages: number
}
function EventListPagination({currentPage, pages}: Props) {
    const [page, setPage] = useState(currentPage);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const handleChange = (page: number) => {
        if (page > pages) {
            return
        }
        setPage(page)
        const params = new URLSearchParams(searchParams);
        params.set('page', `${page}`)
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <Pagination
            isCompact
            showControls
            showShadow
            color={'default'}
            page={page}
            total={pages}
            onChange={handleChange}
        />

);
}

export default EventListPagination;