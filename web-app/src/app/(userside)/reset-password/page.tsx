'use client'

import React, {useState} from 'react';
import Box from "@/components/utils/Box/Box";
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import {useRouter} from "next/navigation";

type FormValues = {
    password: string;
    repeatPassword: string
};

const schema: ZodType<FormValues> = z.object({
    password: z.string(),
    repeatPassword: z.string(),
});

function Page() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    // TODO: ADD LOGIC
    const submitReset = (data: FormValues) => {
        console.log(data);
        router.push('/');
    };

    return (
        <div className={'flex max-w-screen'}>
            <Box className={'flex flex-col mx-auto mt-unit-4xl p-12 w-2/5'}>
                <h1
                    className={'text-black font-bold text-4xl mb-4'}
                >
                    Reset password
                </h1>
                <form
                    className={'flex flex-col gap-4'}
                    onSubmit={handleSubmit(submitReset)}
                >

                    <InputFormText
                        className={'w-4/5 mr-auto'}
                        type={'password'} register={register} name={'password'} label={'New password'}
                    />

                    <InputFormText
                        className={'w-4/5 mr-auto'}
                        type={'password'} register={register} name={'repeatPassword'} label={'Repeat password'}
                    />

                    <Button
                        className={
                            'm-auto mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            'w-2/5 text-lg font-semibold hover:border-accent hover:text-white'
                        }
                        type="submit"
                    >
                        Continue
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default Page;