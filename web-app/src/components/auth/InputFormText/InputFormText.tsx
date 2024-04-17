'use client';
import React from 'react';
import { Input } from '@nextui-org/input';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    type: string;
    placeHolder?: string;
    errorMessage?: string;
    className?: string;
    register: UseFormRegister<any>;
    rules?: object;
    name: string;
    [x: string]: any;
}

function InputFormText({
    type,
    placeholder,
    register,
    name,
    rules,
    errorMessage,
    ...props
}: Props) {
    return (
        <Input
            {...(register && register(name, rules))}
            type={type}
            placeholder={placeholder}
            errorMessage={errorMessage}
            size={'lg'}
            radius={'sm'}
            variant={'flat'}
            {...props}
            classNames={{
                input: [
                    // 'bg-transparent',
                    'text-black'
                ],
                label: [
                    'text-accent'
                ],
                mainWrapper: [
                    // 'bg-primary',
                    // 'hover:bg-primary'
                    'hover:bg-primary/40'
                ],
                innerWrapper: [
                    // 'hover:bg-primary'
                ],
                inputWrapper: [
                    // 'hover:bg-accent',
                    // 'dark:hover:bg-accent',
                    // "group-data-[focused=true]:bg-primary"
                ]
            }}
        />
    );
}

export default InputFormText;
