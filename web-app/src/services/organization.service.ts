import { axiosWithAuth } from '@/api/interseptors';

export const organizationService = {
    async registerOrganization(data: IOrganization) {
        return await axiosWithAuth.post('/org/register', data);
    },
};