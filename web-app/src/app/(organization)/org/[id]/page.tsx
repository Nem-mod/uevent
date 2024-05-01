'use client'

import React from 'react';
import {useRouter} from "next/navigation";
import {useOrganizationProvider} from "@/providers/OrganizationProvider";

function Page() {
    const router = useRouter();
    router.replace(`/org/${useOrganizationProvider()}/events`)
    return <div className={'text-black'}></div>;
}

export default Page;
