export interface IEvent {
    id: string | number;
    title: string;
    description: string;
    startTime: Date;
    duration: number;
    location: string;
    poster: string;
}

interface IEventFormat {
    id: number;
    name: string;
}

interface IEventTheme {
    id: number;
    name: string
}

export interface ICreateEventTicket {
    type:  string;
    description: string;
    cost: number;
    amount: number;
}

export interface IEventGetRes extends IEvent{
    organization: {
        id: string;
    };
    themes: IEventTheme[];
    format: IEventFormat;
}


export interface ICreateEventAndTickets {
    organizationId: number;
    title: string;
    description: string;
    format: IEventFormat;
    startTime: Date;
    duration: number; // s? ms? m? h?
    poster: string; // url to event poster
    location: string;
    tickets: ICreateEventTicket[];
}