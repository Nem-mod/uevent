import {Link} from "@nextui-org/react";
import {verifyUser} from "@/actions/auth/user-verifications";
import ResendVerificationLink from "@/components/auth/ResendVerificationLink/ResendVerificationLink";

interface SearchQuery {
    token: string;
    userId: string;
}

interface Props {
    params?: any;
    searchParams?: SearchQuery
}

export default async function Page({params, searchParams}: Props) {
    if (!searchParams) {
        return <div></div>
    }
    const {token, userId} = searchParams;
    const verificationStatus = await verifyUser(token, userId);

    return verificationStatus ? (

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
    ) : (

        <div className={'m-auto mt-12 max-w-screen-xl px-2 text-black'}>
            <div className='flex flex-col gap-8 justify-center items-center'>
                <h1 className='text-4xl font-bold'>Error</h1>
                <p>Verification token has expired</p>
                <p className='text-slate-400 cursor-pointer'>
                    <ResendVerificationLink userId={userId} />
                </p>
            </div>
        </div>
    )
}
