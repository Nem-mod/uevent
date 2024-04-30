import EventSearchForm from '@/components/core/EventSearchForm/EventSearchForm';
import EventList from '@/components/core/EventList/EventList';
import EventListPagination from '@/components/core/EventListPagination/EventListPagination';
import { IEventsGetWithPagination } from '@/types/event.types';
import { PAGINATION_OFFSET } from '@/constants/pagination';
import { countPaginationPages } from '@/utils/count-pagination-pages';

type SearchQuery  = {
    date: string[] | string;
    format: number[] | number;
    page: number;
    totalPages: number;
    offset: number;
}

interface Props {
    params?: any;
    searchParams?: SearchQuery;
}

async function fetchEvents(query?: SearchQuery): Promise<IEventsGetWithPagination> {
    const offset = query?.offset || PAGINATION_OFFSET;
    const page = (query?.page && query.page - 1) || 0;
    const { format, date } = query || {};
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/event/?`
        + `offset=${offset}`
        + `&page=${page}`
        + (format ? `&format=${format}`: '')
        + (date ? `&date=${date}`: '')
        ,
        {
            cache: 'no-cache',
        },
    );
    return await response.json();
}

export default async function Page({ params, searchParams }: Props) {
    const { data: eventList, count } = await fetchEvents(searchParams);
    console.log(eventList);
    return (
        <div className={'m-auto max-w-screen-xl pt-12 text-black'}>
            <h1 className={'text-6xl'}>Tickets</h1>
            <EventSearchForm className={'mt-10'} />
            <br />
            {eventList && (
                <div className={'flex flex-col gap-5'}>
                    <EventList events={eventList} />
                    <div className='flex w-full justify-center'>
                        <EventListPagination currentPage={searchParams?.page || 0}
                                             pages={countPaginationPages(count, searchParams?.offset)} />
                    </div>
                </div>
            )}
            {JSON.stringify(searchParams)}
        </div>
    );
}

