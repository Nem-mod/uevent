'use client';
import React from 'react';

import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import { Button } from '@nextui-org/button';
import Box from "../../utils/Box/Box";

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const schema: ZodType<FormValues> = z
    .object({
        username: z.string().min(3, 'Username is too short'),
        email: z.string().email('Incorrect email'),
        password: z.string().min(4, 'Password is too short').max(20),
        confirmPassword: z.string().min(4, 'Password is too short').max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });

function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    // TODO: ADD LOGIC
    const submitLogin = (data: FormValues) => {
        console.log(data);
    };
    return (
        <form
            className={'flex flex-col gap-4 p-4 bg-transparent w-fill justify-center items-center [&>*]:shadow-sm'}
            onSubmit={handleSubmit(submitLogin)}
        >
            <h1 className={'text-black text-3xl font-bold'}>Registration lmao</h1>

            <InputFormText

                register={register}
                name={'username'}
                type={'text'}
                label={'Username'}
                errorMessage={errors.username?.message}
            />

            <InputFormText

                register={register}
                name={'email'}
                type={'text'}
                label={'Email'}
                errorMessage={errors.email?.message}
            />
            <InputFormText
                name={'password'}
                register={register}
                type={'password'}
                label={'Password'}
                errorMessage={errors.password?.message}
            />
            <InputFormText

                name={'confirmPassword'}
                register={register}
                type={'password'}
                label={'Repeat Password'}
                errorMessage={errors.confirmPassword?.message}
            />
            <Button
                type={'submit'}
                className={
                    'mt-4 bg-accent h-12 text-white border-primary border hover:bg-accent ' +
                    'hover:border-accent text-lg font-semibold w-3/5 hover:text-white'
                }
            >
                Sign Up
            </Button>
        </form>
    );
}

export default RegistrationForm;
