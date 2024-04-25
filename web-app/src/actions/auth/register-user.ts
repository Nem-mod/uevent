'use server'
import {IUserRegisterForm, IUserRegisterRes} from "@/types/user.types";
import {redirect} from "next/navigation";
import {sendRegisterVerification} from "@/actions/auth/user-verifications";

export async function registerUser(data: IUserRegisterForm, redirectURL: string) {
    let user: IUserRegisterRes | null = null;
    try {
        const response = await fetch(`${process.env.HOST_SERVER_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(`Registration failed, user already exists`);
        }

        user = await response.json();

        if (!user)
            throw new Error(`Error`);

        const verificationRes = await sendRegisterVerification(`${redirectURL}?token=replaceToken&userId=${user.id}`, user.id);

        if (!verificationRes || verificationRes?.error) {
            throw new Error('Failed to send verification')
        }

    } catch (error) {
        if (error instanceof Error)
            return error.message;
    }

    if (user)
        redirect(`/signup/success?userId=${user.id}`);
}