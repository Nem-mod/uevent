'use client';
import {z, ZodType} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import {Button} from '@nextui-org/button';
import {IUserRegisterForm} from "@/types/user.types";
import {authService} from "@/services/auth.service";
import {useRouter} from "next/navigation";


const schema: ZodType<IUserRegisterForm> = z
    .object({
        username: z.string().min(3, 'Username is too short'),
        email: z.string().email('Incorrect email'),
        password: z.string().min(4, 'Password is too short'),
            // .refine(isStrongPassword, 'Use at least one number and uppercase character'),
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
        setError,
        formState: {errors},
    } = useForm<IUserRegisterForm>({resolver: zodResolver(schema)});

    const router = useRouter();
    const action: () => void = handleSubmit(async (data: IUserRegisterForm) => {
        try {
            const user = await authService.register(data);
            const redirectURL = `${window.location.origin}/verify?token=replaceToken&userId=${userId}`;

            await authService.sendVerificationLink(redirectURL, user.id);
            router.push(`/signup/success?userId=${user.id}`);
        } catch (error) {
            if (error instanceof Error)
                setError('root', {type: 'custom', message: error.message});
        }

    });

    return (
        <form
            onSubmit={action}
            className={
                'w-fill flex flex-col items-center justify-center gap-4 bg-transparent p-4 [&>*]:shadow-sm'
            }
        >
            <h1 className={'text-3xl font-bold text-black'}>Registration lmao</h1>

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
            {errors.root?.message && (
                <h1 className={'text-red-600'}>{errors.root.message}</h1>
            )}
            <Button
                type={'submit'}
                className={
                    'mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                    'w-3/5 text-lg font-semibold hover:border-accent hover:text-white'
                }
            >
                Sign Up
            </Button>
        </form>
    );
}

export default RegistrationForm;
