'use client'
import React, { createContext, useContext } from 'react';
import { IUserRegisterAndAuthRes } from '@/types/user.types';

type useUserHook = (value: IUserRegisterAndAuthRes | null) => void;

const UserContext = createContext<[IUserRegisterAndAuthRes | null , useUserHook | null]>([null, null]);

export function useUserProvider() {
    return useContext(UserContext);
}


function OrganizationProvider({ children, user, hook } : { children: React.ReactNode, hook: useUserHook, user?: IUserRegisterAndAuthRes | null }) {
    return (
        <UserContext.Provider value={[user || null, hook]}>
            { children }
        </UserContext.Provider>
    );
}

export default OrganizationProvider;