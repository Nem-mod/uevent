'use client';

import React, { useState } from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import { Link } from '@nextui-org/react';
import { IUserAuthForm } from '@/types/user.types';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useUserProvider } from '@/providers/UserProvider';
import ReCAPTCHA from 'react-google-recaptcha';

const schema: ZodType<IUserAuthForm> = z.object({
    email: z.string().email(),
    password: z.string(),
});

function LoginForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IUserAuthForm>({ resolver: zodResolver(schema) });

    const router = useRouter();

    const [user, setUser] = useUserProvider();
    const [errCount, setErrorCount] = useState(0);
    const [captcha, setCaptcha] = useState<string | null>(null);
    const action: () => void = handleSubmit(async (data: IUserAuthForm) => {
        if (errCount >= 3 && !captcha) {
            setError('root', { type: 'custom', message: 'Pass the captcha' });
            return;
        }

        try {
            const res = await authService.login(data);
            router.refresh();
            if (res && setUser) {
                setUser(res);
            }
            router.push(`/`);
        } catch (error) {
            setErrorCount(prevState => ++prevState)
            // @ts-ignore
            if(window?.grecaptcha) {
                try {
                // @ts-ignore
                    window?.grecaptcha?.reset();
                    setCaptcha(null);
                } catch (e) {

                }
            }
            if (error instanceof Error)
                setError('root', { type: 'custom', message: error.message });
        }
    });

    return (
        <form
            onSubmit={action}
            className={
                'w-fill flex flex-col items-center justify-center gap-4 bg-transparent p-4 [&>*]:shadow-sm'
            }
        >
            <h1 className={'text-3xl font-bold text-black'}> Sign in </h1>

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
            {errCount >= 3 && (
                <div className={'flex w-full'}>
                    <ReCAPTCHA sitekey={'6Ld0I80pAAAAACw2bwrsU_OXHph6h6bKRf0d4fMJ'} onChange={(token) => setCaptcha(token)}/>
                </div>
            )}
            <Link
                href={'/recovery'}
                underline={'hover'}
                className={'ml-auto'}
            >
                Forgot password?
            </Link>
            {errors.root?.message && (
                <h1 className={'text-red-600'}>{errors.root.message}</h1>
            )}
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
