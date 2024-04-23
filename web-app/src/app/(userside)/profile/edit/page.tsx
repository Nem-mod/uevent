'use client'

import React from 'react';
import Box from "@/components/utils/Box/Box";
import {Button, Link} from "@nextui-org/react";
import InputFormText from "@/components/auth/InputFormText/InputFormText";
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = {
    email: string,
    username: string
}

const schema: ZodType<FormValues> = z.object({
    username: z.string(),
    email: z.string().email(),
});

function Page() {

    const user = {
        username: 'Getter-of-bitches',
        email: 'john.doe@gmail.com'
    }

    const {
        register,
        handleSubmit,
        formState: {

        }
    } = useForm<FormValues>({resolver: zodResolver(schema)})

    // TODO: ADD LOGIC
    const submitEdit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className={'p-10 grid place-items-center'}>
            <span className={'text-6xl font-extrabold text-black pt-4'}>
                Edit Profile
            </span>
            <Box className={'flex w-2/5 my-6'}>
                <form onSubmit={handleSubmit(submitEdit)} className={'w-full flex flex-col gap-4 p-8 py-14'}>
                    <InputFormText
                        type={'text'}
                        register={register}
                        name={'username'}
                        label={'Username'}
                        defaultValue={user.username}
                    />
                    <InputFormText
                        type={'text'}
                        register={register}
                        name={'email'}
                        label={'Email'}
                        defaultValue={user.email}
                    />
                    <div className={'flex flex-row gap-2 mt-8'}>
                        <Button
                            type={'submit'}
                            className={
                                'mt-auto mr-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                                'w-fit text-lg font-semibold hover:border-accent hover:text-white'
                            }
                        >
                            Save changes
                        </Button>
                        <Button
                            href={'/profile'}
                            as={Link}
                            className={
                                'mt-auto ml-auto h-12 border border-primary bg-red-800 text-white hover:bg-red-800/80 ' +
                                'w-fit text-lg font-semibold hover:border-accent hover:text-white'
                            }
                        >
                            Discard changes
                        </Button>
                    </div>
                </form>
            </Box>
        </div>
    );
}

export default Page;