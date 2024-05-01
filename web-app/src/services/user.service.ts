import { axiosWithAuth } from '@/api/interseptors';
import { IUserRegisterAndAuthRes, IUserUpdate } from '@/types/user.types';

export const userService = {
    async updateUser(data: IUserUpdate): Promise<IUserRegisterAndAuthRes> {
        const response = await axiosWithAuth.patch('/users/', data);
        return response.data;
    }
}