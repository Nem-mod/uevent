export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface IUserRegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUserRegisterRes {
    id: number;
    email: string;
    username: string;
    verified: boolean;
}