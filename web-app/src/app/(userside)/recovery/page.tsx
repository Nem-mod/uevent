'use client'

import React, {useState} from 'react';
import Box from "@/components/utils/Box/Box";
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import {Link} from "@nextui-org/react";

type FormValues = {
    email: string;
};

const schema: ZodType<FormValues> = z.object({
    email: z.string().email(),
});

function Page() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const [recoverySent, setRecoverySent] = useState(false);

    // TODO: ADD LOGIC
    const submitRecovery = (data: FormValues) => {
        console.log(data);
        setRecoverySent(true);
    };

    return (
        <div className={'flex max-w-screen'}>
            <Box className={'flex flex-col mx-auto mt-unit-4xl p-12 w-2/5'}>
                <h1
                    className={'text-black font-bold text-4xl mb-4'}
                >
                    Account recovery
                </h1>
                <div className={!recoverySent ? 'hidden' : 'flex flex-col'}>
                    <span className={'text-gray-700 font-semibold text-2xl mb-12'}>
                        Recovery link has been sent to your email
                    </span>
                    <Button
                        as={Link} href={'/'}
                        className={
                            'm-auto mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            'w-2/5 text-lg font-semibold hover:border-accent hover:text-white'
                        }
                    >
                        Return to home
                    </Button>
                </div>
                <form
                    className={recoverySent ? 'hidden' :  'flex flex-col gap-4'}
                    onSubmit={handleSubmit(submitRecovery)}
                >

                    <InputFormText
                        className={'w-4/5 mr-auto'}
                        type={'text'} register={register} name={'email'} label={'Email'}
                    />

                    <Button
                        className={
                            'm-auto mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            'w-2/5 text-lg font-semibold hover:border-accent hover:text-white'
                        }
                        type="submit"
                    >
                        Next
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default Page;