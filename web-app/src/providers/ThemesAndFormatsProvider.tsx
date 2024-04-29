'use client'
import React, { createContext, useContext } from 'react';
import { IThemesAndFormats } from '@/types/theme-format.types';

const ThemesAndFormatsContext = createContext<IThemesAndFormats | null>(null);

export function useThemesAndFormatsProvider() {
    return useContext(ThemesAndFormatsContext);
}


function ThemesAndFormatsProvider({ children, data } : { children: React.ReactNode, data?: IThemesAndFormats | null}) {
    return (
        <ThemesAndFormatsContext.Provider value={data || null}>
            { children }
        </ThemesAndFormatsContext.Provider>
    );
}

export default ThemesAndFormatsProvider;