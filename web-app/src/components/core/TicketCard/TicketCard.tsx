import React from 'react';
import Box from "@/components/utils/Box/Box";

interface props {
    ticket: {
        title: string,
        location: string,
        startDate: Date
    }
}

function TicketCard({ticket}: props) {
    return (
        <Box className={'flex flex-col rounded-2xl w-fit'}>
            <span className={'text-3xl font-bold text-black'}>
                {ticket.title}
            </span>
            <span className={'text-2xl font-bold text-gray-700'}>
                {ticket.location}
            </span>
            <span className={'text-2xl font-bold text-gray-700'}>
                {ticket.startDate?.toDateString()}
            </span>
        </Box>
    );
}

export default TicketCard;