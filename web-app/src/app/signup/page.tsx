import React from 'react';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import Box from "@/components/utils/Box/Box";

function Page() {
    return (
        <div className={'grid place-items-center'}>
            <Box className={'max-w-xl justify-center'}>
                <RegistrationForm />
            </Box>
        </div>
    );
}

export default Page;
