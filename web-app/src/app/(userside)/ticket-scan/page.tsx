'use client';
import { useSearchParams } from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    return (
        <div>Token {token}</div>
    );
}

export default Page;