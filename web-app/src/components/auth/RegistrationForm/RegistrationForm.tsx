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
            className={'flex flex-col gap-4 p-4 bg-transparent w-3/5'}
            onSubmit={handleSubmit(submitLogin)}
        >
            <InputFormText
                classNames={{
                    input: [
                        'bg-transparent',
                    ],
                    label: [
                        'text-accent'
                    ],
                    mainWrapper: [
                        'bg-secondary',
                        // 'hover:bg-primary'
                    ],
                    innerWrapper: [
                        // 'hover:bg-primary'
                    ],
                    inputWrapper: [
                        // 'hover:bg-accent',
                        // 'dark:hover:bg-accent',
                        "group-data-[focused=true]:bg-primary"
                    ]
                }}
                register={register}
                name={'username'}
                type={'text'}
                label={'Username'}
                errorMessage={errors.username?.message}
            />

            <InputFormText
                classNames={{
                    input: [
                        'bg-transparent',
                    ],
                    label: [
                        'text-accent'
                    ],
                    mainWrapper: [
                        'bg-secondary',
                        // 'hover:bg-primary'
                    ],
                    innerWrapper: [
                        // 'hover:bg-primary'
                    ],
                    inputWrapper: [
                        'hover:bg-accent',
                        'dark:hover:bg-accent'
                    ]
                }}
                register={register}
                name={'email'}
                type={'text'}
                label={'Email'}
                errorMessage={errors.email?.message}
            />
            <InputFormText
                classNames={{
                    input: [
                        'bg-transparent',
                    ],
                    label: [
                        'text-accent'
                    ],
                    mainWrapper: [
                        'bg-secondary',
                        // 'hover:bg-primary'
                    ],
                    innerWrapper: [
                        // 'hover:bg-primary'
                    ],
                    inputWrapper: [
                        'hover:bg-accent',
                        'dark:hover:bg-accent'
                    ]
                }}
                name={'password'}
                register={register}
                type={'password'}
                label={'Password'}
                errorMessage={errors.password?.message}
            />
            <InputFormText
                classNames={{
                    input: [
                        'bg-transparent',
                    ],
                    label: [
                        'text-accent',
                        'focus:text-accent'
                    ],
                    mainWrapper: [
                        'bg-secondary',
                        // 'hover:bg-primary'
                    ],
                    innerWrapper: [
                        // 'hover:bg-primary'
                    ],
                    inputWrapper: [
                        'hover:bg-accent',
                        'dark:hover:bg-accent'
                    ]
                }}
                name={'confirmPassword'}
                register={register}
                type={'password'}
                label={'Password'}
                errorMessage={errors.confirmPassword?.message}
            />
            <Button
                type={'submit'}
                className={'mt-4 bg-secondary text-black border-primary border hover:bg-primary hover:font-semibold'}
            >
                Submit
            </Button>
        </form>
    );
}

export default RegistrationForm;
