import { axiosWithAuth } from '@/api/interseptors';
import { ICreateEventAndTickets } from '@/types/event.types';

export const eventService = {
    async createEvent(data: ICreateEventAndTickets, orgId: number | string) {
        try {
            const response = await axiosWithAuth.post(`/event/${orgId}`, data);
            return response.data;
        } catch (error) {
            // console.log(error);
        }
    },
}