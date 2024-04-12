import React from 'react';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import Box from "@/components/utils/Box/Box";

function Page() {
    return (
        <div className={'grid place-items-center'}>
            <Box>
                <LoginForm />
            </Box>
        </div>
    );
}

export default Page;
