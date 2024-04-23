import React from 'react';
import {Link} from "@nextui-org/react";

function Page() {
    return (
        <div className={'m-auto mt-12 max-w-screen-xl px-2 text-black'}>
            <div className='flex flex-col gap-8 justify-center items-center'>
                <h1 className='text-4xl font-bold'>Success!</h1>
                <p>You verified account. Gratz!</p>
                <p className='text-slate-400'>
                    <i>
                        <Link href={'/signin'}>Follow the link to log in.</Link>
                    </i>
                </p>
            </div>
        </div>
    );
}

export default Page;