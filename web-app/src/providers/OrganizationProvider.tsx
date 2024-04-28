'use client'
import React, { createContext, useContext } from 'react';

const OrganizationContext = createContext<number>(0);

export function useOrganizationProvider() {
    return useContext(OrganizationContext);
}


function OrganizationProvider({ children, orgId } : { children: React.ReactNode, orgId: number}) {
    return (
        <OrganizationContext.Provider value={orgId}>
            { children }
        </OrganizationContext.Provider>
    );
}

export default OrganizationProvider;