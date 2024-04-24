import React from 'react';
import Box from "@/components/utils/Box/Box";
import RegisterOrgForm from "@/components/organization/RegisterOrgForm/RegisterOrgForm";

function Page() {
    return (
        <div className={'m-auto mt-10 max-w-screen-xl'}>
            <div className={'flex gap-10'}>
                <Box className={'flex-grow basis-1/2 justify-center bg-accent/15'}>
                    <RegisterOrgForm />
                </Box>
                <div className={'flex-grow basis-1/2'}>
                    <h1 className={'text-xl font-bold text-black'}>Now you have</h1>
                    <p className={'text-black'}>No bitches lmao</p>
                </div>
            </div>
        </div>
    );
}

export default Page;