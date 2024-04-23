import EventSearchForm from '@/components/core/EventSearchForm/EventSearchForm';
import EventList from "@/components/core/EventList/EventList";
import EventListPagination from "@/components/core/EventListPagination/EventListPagination";

interface SearchQuery {
    data: string[] | string;
    format: string[] | string;
    page: number;
    totalPages: number;
    offset: number

}

interface Props {
    params?: any;
    searchParams?: SearchQuery
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => {
    return {
        id: e,
        title: `VIP event (No bitches) ID ${e}`,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores aut blanditiis, cum deleniti dicta facere illo, illum inventore maiores mollitia non provident, quisquam sequi sunt suscipit tempore temporibus ullam!',
        startTime: new Date(),
        duration: 120 * 60,
        price: 400,
        location: '221B Baker Street',
        poster: 'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp',
    }
})

async function fetchEvents(query?: SearchQuery, body?: any) {
    const offset = query?.offset || 2;
    const page = query?.page || 1;
    const pbefore = (page - 1) * offset;
    const cevnts = page * offset;
    console.log(pbefore, cevnts);
    return data.slice(pbefore, cevnts);
}

export default async function Page({params, searchParams}: Props) {
    let eventList = await fetchEvents(searchParams);
    console.log(eventList)
    const dummyData = await fetch('https://dummyjson.com/products/1')
    console.log(dummyData)
    return (
        <div className={'m-auto max-w-screen-xl pt-12 text-black'}>
            <h1 className={'text-6xl'}>Tickets</h1>
            <EventSearchForm className={'mt-10'}/>
            <br/>
            {eventList && (
                <div className={'flex flex-col gap-5'}>
                    <EventList events={eventList}/>
                    <div className="flex w-full justify-center">
                        <EventListPagination currentPage={searchParams?.page || 1} pages={searchParams?.totalPages || 4}/>
                    </div>
                </div>
            )}
            {JSON.stringify(searchParams)}
        </div>
    );
}

