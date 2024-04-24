'use client';

import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import Box from "@/components/utils/Box/Box";
import {Link} from "@nextui-org/react";

type FormValues = {
    email: string;
    password: string;
};

const schema: ZodType<FormValues> = z.object({
    email: z.string().email(),
    password: z.string(),
});

function LoginForm() {
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
            onSubmit={handleSubmit(submitLogin)}
            className={
                'w-fill flex flex-col items-center justify-center gap-4 bg-transparent p-4 [&>*]:shadow-sm'
            }
        >
            <h1 className={'text-3xl font-bold text-black'}> Sign in bitch</h1>

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
            <Link
                href={'/recovery'}
                underline={'hover'}
                className={'ml-auto'}
            >
                Forgot password?
            </Link>
            <Button
                type={'submit'}
                className={
                    'mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                    'w-2/5 text-lg font-semibold hover:border-accent hover:text-white'
                }
            >
                Submit
            </Button>
        </form>
    );
}

export default LoginForm;
