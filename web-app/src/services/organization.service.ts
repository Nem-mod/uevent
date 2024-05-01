import { axiosWithAuth } from '@/api/interseptors';
import { IOrganization, IOrganizationRegisterForm } from '@/types/organization.types';

export const organizationService = {
    async registerOrganization(data: IOrganizationRegisterForm) {
        try {
            const response = await axiosWithAuth.post('/org/register', data);
            return response.data;
        } catch (e) {

        }
    },

    async getAllOrganizations(): Promise<IOrganization[]> {
        try {
            const response = await axiosWithAuth.get('/org');
            return response.data;
        } catch (e) {
            // throw new Error('Get all org error');
        }
    },
};