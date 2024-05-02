'use client';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { TicketStatistic } from '@/types/event.types';
import React, { useMemo, useState } from 'react';
import { useUserProvider } from '@/providers/UserProvider';
import { ticketService } from '@/services/ticket.service';
import { useRouter } from 'next/navigation';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { stripePromise } from '@/constants/stripe';

interface Props {
    eventId: number | string;
    ticketTypes: TicketStatistic[];
}

function BuyTicketForm({ ticketTypes, eventId }: Props) {
    const [user] = useUserProvider();
    const [ticketType, setTicketType] = useState<string>();
    const [email, setEmail] = useState();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const router = useRouter();

    // const [isFirstStep, setIsFirstStep] = useState(Boolean(user?.verified));
    const handleSubmit = async () => {
        if (!ticketType) {
            return;
        }

        const secret: string = await ticketService.buyTicket(eventId, ticketType);
        setClientSecret(secret);
    };

    const ticketsAmount = useMemo(() => {
            return ticketTypes.reduce((accumulator, currentValue) => {
                return accumulator + (Number(currentValue.overallCount) - Number(currentValue.soldCount));
            }, 0)
        },
        [ticketTypes],
    );


    if (ticketsAmount === 0)
        return (
            <></>
        )
    return (
        <div className={'w-full text-black'}>

            {clientSecret ? (
                <div id='checkout'>
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                        }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            ) : (
                <>
                    <Select
                        isRequired={true}
                        selectedKeys={ticketType ? [ticketType] : []}
                        onChange={(e) => setTicketType(e.target.value)}
                        size={'lg'}
                        label={'Formats'}
                        className={'mt-6 text-red-600'}
                    >
                        {ticketTypes && ticketTypes.map((type) => (
                            <SelectItem className={'text-black'} key={type.type} textValue={type.type}>
                                {type.type} - Cost: {type.cost}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button
                        onClick={handleSubmit}
                        className={
                            'mt-5 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            ' text-lg font-semibold hover:border-accent hover:text-white'
                        }
                    >
                        Buy ticket
                    </Button>
                </>
            )}
        </div>
    );
}

export default BuyTicketForm;