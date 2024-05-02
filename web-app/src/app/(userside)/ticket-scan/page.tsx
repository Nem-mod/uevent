'use client';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {ticketService} from '@/services/ticket.service';
import {Button} from '@nextui-org/button';
import {ITicket, TicketStatus} from '@/types/ticket.types';


function Page() {
    const [ticketInfo, setTicketInfo] = useState<ITicket>();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token)
            return;
        ticketService.scanTicket(token).then(res => {
            setTicketInfo(res);
        });
    }, [token]);

    const handleCompostTicket = async () => {
        if (!token) {
            return;
        }
        const res = await ticketService.compostTicket(token);
        console.log(res);
    };

    return (
        <div className={'m-auto mt-12 max-w-screen-xl px-2 text-black'}>
            {ticketInfo && (
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <h1 className='text-4xl font-bold'>Ticket: {ticketInfo.type}</h1>
                    <p>Description: {ticketInfo.description}</p>
                    <p>Cost: {ticketInfo.cost}$</p>

                    {(ticketInfo.status !== TicketStatus.COMPOSTED) &&  (<p className='text-slate-400'>
                        <i>
                            <Button onClick={handleCompostTicket} className={'bg-accent text-white'}>Compost</Button>
                        </i>
                    </p>)}
                    {TicketStatus[ticketInfo.status]}
                </div>
            )}
        </div>
    );
}

export default Page;