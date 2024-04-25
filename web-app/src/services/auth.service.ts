import {IUserAuthForm, IUserRegisterAndAuthRes, IUserRegisterForm} from "@/types/user.types";
import {axiosWithoutAuth} from "@/api/interseptors";
import {AxiosError} from "axios";

export const authService = {
    async login(data: IUserAuthForm): Promise<IUserRegisterAndAuthRes> {
        const response = await axiosWithoutAuth.post('/auth/user/login', data);
        if (response.statusText != 'OK')
            throw new AxiosError('Login is failed');
        return response.data;
    },
    async register(data: IUserRegisterForm): Promise<IUserRegisterAndAuthRes> {
        try {
            const response = await axiosWithoutAuth.post('/users/register', data);
            return response.data;
        } catch (e) {
            throw new AxiosError('Registration failed, user already exists')
        }
    },

    async sendVerificationLink(returnLink: string, userId: number | string) {
        const response = await axiosWithoutAuth.post(`/auth/user/${userId}/send/verify`, {returnLink});
        return true
    },

    async confirmVerification(token: string, userId: string) {
        const response = await axiosWithoutAuth.patch(`/auth/user/${userId}/validate/verify`, {token})
        return true
    }
}