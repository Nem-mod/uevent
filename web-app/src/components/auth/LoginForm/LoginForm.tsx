'use client';

import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import Box from "@/components/utils/Box/Box";

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
        <Box>
            <form onSubmit={handleSubmit(submitLogin)}>
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
                <Button type={'submit'}>Submit</Button>
            </form>
        </Box>
    );
}

export default LoginForm;
