import React from 'react';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import Box from "@/components/utils/Box/Box";

function Page() {
    return (
        <div className={'max-w-screen-xl m-auto mt-10'}>
            <div className={'flex gap-10'}>
                <div className={'flex-grow basis-1/2'}>
                    <h1 className={'text-black text-xl font-bold'}>You will get</h1>
                    <p className={'text-black'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, omnis, voluptatem. Accusamus consequatur, earum facere incidunt ipsam laudantium nobis quae sint ullam veritatis! Molestias nesciunt, officia optio rem ut voluptatum.
                    </p>
                </div>
                <Box className={'justify-center flex-grow basis-1/2 bg-accent/15'}>
                    <RegistrationForm />
                </Box>
            </div>
        </div>
    );
}

export default Page;
