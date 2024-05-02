import { axiosWithAuth, axiosWithoutAuth } from '@/api/interseptors';
import { IPaymentLinkLinks, ITicket, ITicketsPaginated } from '@/types/ticket.types';


export const ticketService = {
    async getEventTickets(id: number, page: number, offset: number): Promise<ITicketsPaginated> {
        try {
            const response = await axiosWithAuth.get(
                `/tickets/event/${id}?offset=${offset}&page=${page}`,
            );
            return response.data;
        } catch (e) {
            throw new Error('Error getting paginated tickets');
        }
    },

    async getAvailableTicket(id: number, type: string): Promise<ITicket> {
        try {
            const response = await axiosWithAuth.get(
                `/tickets/event/${id}/type/${type}`,
            );
            return response.data;
        } catch (e) {
            throw new Error('Error getting available ticket');
        }
    },


    async buyTicket(eventId: number | string, ticketType: string) {
        try {
            const body: IPaymentLinkLinks = {
                returnLink: `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/ticket-scan?token=replaceToken`,
                successUrl: `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/events/${eventId}/success-payment`,
                cancelUrl: `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/${eventId}/cancel-payment`,
            };
            const response = await axiosWithAuth.post(`/tickets/event/${eventId}/type/${ticketType}/buy`, body);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async scanTicket(token: string): Promise<ITicket>{
            const body = { token: token };
            const response = await axiosWithoutAuth.post(`/tickets/scan`, body);
            return response.data;
    },


    async compostTicket(token: string): Promise<ITicket>{
        const body = { token: token };
        const response = await axiosWithoutAuth.patch(`/tickets/compost`, body);
        return response.data;
    },

    async getUsersTickets() {
        const response = await axiosWithAuth.get('/tickets/user/me');
        return response.data;
    }
};
