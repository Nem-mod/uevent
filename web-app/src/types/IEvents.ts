export interface IEvents {
    id: string | number,
    title: string,
    description: string,
    startTime: Date,
    duration: number
    location: string
    poster: string
}

interface EventFormat {
    id: number
    format?: string
}

export interface ICreateEventTicket {
    type:  string;
    description: string;
    cost: number;
    amount: number
}

export interface ICreateEventAndTickets {
    organizationId: number;
    title: string;
    description: string;
    format: EventFormat;
    startTime: Date;
    duration: number; // s? ms? m? h?
    poster: string; // url to event poster
    location: string;
    tickets: ICreateEventTicket[]
}