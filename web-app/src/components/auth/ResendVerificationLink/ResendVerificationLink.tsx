"use client"

import {Link} from "@nextui-org/react";
import React from "react";
import {sendRegisterVerification} from "@/actions/auth/user-verifications";

interface Props {
    userId: string | number
}
function ResendVerificationLink({userId}: Props) {
    const handleClick = async () => {
        const redirectURL = `$${window.location.origin}/verify?token=replaceToken&userId=${userId}`;
        await sendRegisterVerification(redirectURL, userId)
    }
    return (
        <Link onClick={handleClick} >Click to resend.</Link>
    );
}

export default ResendVerificationLink;