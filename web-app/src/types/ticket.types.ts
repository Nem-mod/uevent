export interface ITicket {
    id: number
    eventId: number
    type: string
    cost: number
}

export interface ITicketsPaginated {
    count: number
    data: ITicket[] | []
}