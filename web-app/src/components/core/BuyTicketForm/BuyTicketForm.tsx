'use client'
import { Button, Select, SelectItem } from '@nextui-org/react';
import { TicketStatistic } from '@/types/event.types';
import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { useUserProvider } from '@/providers/UserProvider';

interface Props {
    ticketTypes: TicketStatistic[]
}

function BuyTicketForm({ ticketTypes }: Props) {
    const [user] = useUserProvider();
    const [ticketType, setTicketType] = useState<number>();
    const [email, setEmail] = useState();
    const [isFirstStep, setIsFirstStep] = useState(Boolean(user?.verified));
    const handleSubmit = async () => {
        if (!ticketType) {
            return;
        }

        if (!isFirstStep && !user) {
            setIsFirstStep(true);
            return;
        }
        console.log(user ? user.email : email, ticketType);
    }
    return (
        <div className={'w-full text-black'}>
                <Select
                    isRequired={true}
                    selectedKeys={ticketType ? [ticketType]: []}
                    onChange={ (e) => setTicketType(e.target.value)}
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
            {isFirstStep && (
                <Input label={'Email'} type={'email'} isRequired={true}  className={'mt-5'} value={email} onChange={setEmail} />
            )}
            <Button
                onClick={handleSubmit}
                className={
                    'mt-5 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                    ' text-lg font-semibold hover:border-accent hover:text-white'
                }
            >
                {!isFirstStep ? 'Buy ticket': 'Confirm Email and continue'}
            </Button>
        </div>
    );
}

export default BuyTicketForm;