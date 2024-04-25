import ResendVerificationLink from "@/components/auth/ResendVerificationLink/ResendVerificationLink";

interface SearchQuery {
    userId: string;
}

interface Props {
    params?: any;
    searchParams: SearchQuery
}

function Page({params, searchParams: {userId}}: Props) {
    return (
        <div className={'m-auto mt-12 max-w-screen-xl px-2 text-black'}>
            <div className='flex flex-col gap-8 justify-center items-center'>
                <h1 className='text-4xl font-bold'>Confirm registration</h1>
                <p>We have send you an email to verify account. Follow the link in the mail to continue</p>
                <p className='text-slate-400 cursor-pointer'>
                    <ResendVerificationLink userId={userId} />
                </p>
            </div>
        </div>
    );
}

export default Page;