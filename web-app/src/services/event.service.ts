import { axiosWithAuth } from '@/api/interseptors';
import {ICreateEventAndTickets, IEventGetRes} from '@/types/event.types';

export const eventService = {
    async createEvent(data: ICreateEventAndTickets, orgId: number | string) {
        try {
            const response = await axiosWithAuth.post(`/event/${orgId}`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    async getEvent(id: number): Promise<IEventGetRes> {
        try {
            const response = await axiosWithAuth.get(`/event/${id}`);
            return response.data;
        } catch (e) {
            throw new Error('Error fetching event')
        }
    }
}