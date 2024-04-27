'use client';

import { z, ZodType } from 'zod';
import { isMobilePhone } from 'validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { organizationService } from '@/services/organization.service';
import { AxiosError } from 'axios';
import { IOrganizationRegisterForm } from '@/types/organization.types';


const schema: ZodType<IOrganizationRegisterForm> = z
    .object({
        name: z.string().min(3, 'Username is too short'),
        email: z.string().email('Incorrect email'),
        phoneNumber: z.string().refine(isMobilePhone),
        description: z.string(),
        fopIdentifier: z.string(),
    });

function RegisterOrgForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IOrganizationRegisterForm>({ resolver: zodResolver(schema) });

    const handleSubmitRegister = async (data: IOrganizationRegisterForm) => {
        try {
            const res = await organizationService.registerOrganization(data);
        } catch (error) {
            if (error instanceof AxiosError)
                { // @ts-ignore
                    setError('root', {type: 'custom', message: error?.response.data.message});
                }
        }
    }

    return (
        <form
            className={
                'w-fill flex flex-col items-center justify-center gap-4 bg-transparent p-4 [&>*]:shadow-sm'
            }
            onSubmit={handleSubmit(handleSubmitRegister)}
        >
            <h1 className={'text-3xl font-bold text-black'}>Create new Organization!</h1>

            <InputFormText
                register={register}
                name={'name'}
                type={'text'}
                label={'Name'}
                errorMessage={errors.name?.message}
            />

            <InputFormText
                register={register}
                name={'email'}
                type={'text'}
                label={'Email'}
                errorMessage={errors.email?.message}
            />

            <InputFormText
                register={register}
                name={'phoneNumber'}
                type={'text'}
                label={'Phone Number +38 12-345-6789'}
                errorMessage={errors.phoneNumber?.message}
            />
            <InputFormText
                name={'description'}
                register={register}
                type={'text'}
                label={'Organization description'}
                errorMessage={errors.description?.message}
            />
            <InputFormText
                name={'fopIdentifier'}
                register={register}
                type={'text'}
                label={'FOP id'}
                errorMessage={errors.fopIdentifier?.message}
            />
            <Textarea
                {...register('description')}
                label={'Organization description'}
                errorMessage={errors.description?.message}
                classNames={{
                    input: [
                        'text-black',
                    ],
                    label: ['text-accent'],
                    mainWrapper: [
                        'hover:bg-primary/40',
                    ],
                }}
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
                Apply
            </Button>
        </form>
    );
}

export default RegisterOrgForm;