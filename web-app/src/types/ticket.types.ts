export interface ITicket {
    id: number;
    eventId: number;
    type: string;
    cost: number;
    description?: string;
    status: TicketStatus
}

export enum TicketStatus {
    AVAILABLE,
    PROCESSING,
    SOLD,
    COMPOSTED,
}

export interface ITicketsPaginated {
    count: number;
    data: ITicket[] | [];
}


export interface IPaymentLinkLinks {
    returnLink: string;
    successUrl: string;
    cancelUrl: string;
}