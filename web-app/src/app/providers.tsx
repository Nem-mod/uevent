'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IUserRegisterAndAuthRes } from '@/types/user.types';
import { authService } from '@/services/auth.service';
import UserProvider from '@/providers/UserProvider';
import { IThemesAndFormats } from '@/types/theme-format.types';
import { themesFormatsService } from '@/services/themes-formats.service';
import ThemesAndFormatsProvider from '@/providers/ThemesAndFormatsProvider';

export interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter();
    const [user, setUser] = useState<IUserRegisterAndAuthRes>();
    const [themesAndFormats, setThemesAndFormats] = useState<IThemesAndFormats>();
    useEffect(() => {
        authService.getMe().then(res => {
            setUser(res);
        }).catch(() => {
        });
        themesFormatsService.getThemesAndFormats().then(res => {
            setThemesAndFormats(res);
        }).catch();
    }, []);

    return (
        <NextUIProvider navigate={router.push}>
            <UserProvider user={user}>
                <ThemesAndFormatsProvider data={themesAndFormats}>
                    {children}
                </ThemesAndFormatsProvider>
            </UserProvider>
        </NextUIProvider>
    );
}
