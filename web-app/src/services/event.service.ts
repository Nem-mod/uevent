import { axiosWithAuth } from '@/api/interseptors';
import { ICreateEventAndTickets, IEventGetRes, IUpdateEvent } from '@/types/event.types';

export const eventService = {
    async createEvent(data: ICreateEventAndTickets, orgId: number | string) {
        try {
            const response = await axiosWithAuth.post(`/event/${orgId}`, data);
            return response.data;
        } catch (error) {
            // console.log(error);
            return null
        }
    },

    async getEvent(id: number | string): Promise<IEventGetRes> {
        try {
            const response = await axiosWithAuth.get(`/event/${id}`);
            return response.data;
        } catch (e) {
            throw new Error('Error fetching event')
        }
    },

    async updateEvent(data: IUpdateEvent, orgId: number) {
        try {
            const response = await axiosWithAuth.patch(`/event/${orgId}`, data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async deleteEvent(eventId: number | string): Promise<void> {
        try {
            await axiosWithAuth.delete(`/event/${eventId}`)
        } catch (e) {
            console.log(e)
        }
    }


}