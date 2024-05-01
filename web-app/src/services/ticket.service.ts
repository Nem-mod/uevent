import {axiosWithAuth} from "@/api/interseptors";
import {ITicket, ITicketsPaginated} from "@/types/ticket.types";


export const ticketService = {
    async getEventTickets(id: number, page: number, offset: number): Promise<ITicketsPaginated> {
        try {
            const response = await axiosWithAuth.get(
                `/tickets/event/${id}?offset=${offset}&page=${page}`
            );
            return response.data;
        } catch (e) {
            throw new Error('Error getting paginated tickets');
        }
    },

    async getAvailableTicket(id: number, type: string): Promise<ITicket> {
        try {
            const response = await axiosWithAuth.get(
                `/tickets/event/${id}/type/${type}`
            );
            return response.data;
        } catch (e) {
            throw new Error('Error getting available ticket');
        }
    }
}
