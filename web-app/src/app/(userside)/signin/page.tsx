import React from 'react';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import Box from '@/components/utils/Box/Box';
import {Link} from "@nextui-org/react";

function Page() {
    return (
        <div className={'m-auto mt-10 max-w-screen-xl'}>
            <div className={'flex gap-10'}>
                <Box className={'flex flex-col flex-grow basis-1/2 justify-center bg-accent/15'}>
                    <LoginForm />
                </Box>
                <div className={'mt-6 flex-grow flex flex-col gap-6 basis-1/2'}>
                    <h1 className={'text-4xl font-semibold text-black'}>Welcome to Multiverse!</h1>
                    <p className={'text-2xl text-black'}>Please log in to access exclusive deals, manage your bookings, and enjoy a seamless ticket purchasing experience. Your entertainment journey starts here. Let's get started!</p>
                </div>
            </div>
        </div>
    );
}

export default Page;
