'use client'
import React, { createContext, useContext } from 'react';
import { IUserRegisterAndAuthRes } from '@/types/user.types';

const UserContext = createContext<IUserRegisterAndAuthRes | null>(null);

export function useUserProvider() {
    return useContext(UserContext);
}


function OrganizationProvider({ children, user } : { children: React.ReactNode, user?: IUserRegisterAndAuthRes | null}) {
    return (
        <UserContext.Provider value={user || null}>
            { children }
        </UserContext.Provider>
    );
}

export default OrganizationProvider;