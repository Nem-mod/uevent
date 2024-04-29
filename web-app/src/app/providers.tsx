'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IUserRegisterAndAuthRes } from '@/types/user.types';
import { authService } from '@/services/auth.service';
import UserProvider from '@/providers/UserProvider';

export interface ProvidersProps {
    children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
    const router = useRouter();
    const [user, setUser] = useState<IUserRegisterAndAuthRes | null>(null);

    useEffect(() => {
        authService.getMe().then(res => {
            setUser(res);
        }).catch(() => {
            setUser(null);
        });
    }, []);

    return (
        <UserProvider user={user}>
            <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </UserProvider>
    );
}
