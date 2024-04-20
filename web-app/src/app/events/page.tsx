import EventSearchForm from "@/components/core/EventSearchForm/EventSearchForm";

interface Props {
    params? : any
    searchParams?: {
        data: string[] | string,
        format: string[] | string
    }
}
function Page({params, searchParams}: Props ) {
    return (
        <div className={'pt-12 max-w-screen-xl m-auto text-black'}>
            <h1 className={'text-6xl'}>Tickets</h1>
            <EventSearchForm className={'mt-10'}/>
            <br/>
            {JSON.stringify(params)}
            {JSON.stringify(searchParams)}

        </div>
    );
}

export default Page;