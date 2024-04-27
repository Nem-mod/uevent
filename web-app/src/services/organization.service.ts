import { axiosWithAuth } from '@/api/interseptors';
import { IOrganization, IOrganizationRegisterForm } from '@/types/organization.types';

export const organizationService = {
    async registerOrganization(data: IOrganizationRegisterForm) {
        const response = await axiosWithAuth.post('/org/register', data);
        return response.data;
    },

    async getAllOrganizations(): Promise<IOrganization[]>{
        const response = await axiosWithAuth.get('/org');
        return response.data;
    }
};