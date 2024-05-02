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
                <div className={'mt-6 flex flex-col gap-6 flex-grow basis-1/2'}>
                    <h1 className={'text-4xl font-semibold text-black'}>Ready to take your organization to the next level?</h1>
                    <p className={'text-2xl text-black'}>Create a new account and elevate your team's efficiency and collaboration. Whether you're managing events, projects, or teams, our platform offers the tools you need to succeed. Let's build something great together!</p>
                </div>
            </div>
        </div>
    );
}

export default Page;