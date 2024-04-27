'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import StoreProvider from '@/providers/StoreProvider';
import { NextUIProvider } from '@nextui-org/react';

export interface ProvidersProps {
    children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
    const router = useRouter();

    return (
        <StoreProvider>
            <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </StoreProvider>
    );
}
