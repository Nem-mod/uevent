"use client"

import {Link} from "@nextui-org/react";
import {authService} from "@/services/auth.service";

interface Props {
    userId: string | number
}
function ResendVerificationLink({userId}: Props) {
    const handleClick = async () => {
        const redirectURL = `${window.location.origin}/verify?token=replaceToken&userId=${userId}`;
        await authService.sendVerificationLink(redirectURL, userId)
    }
    return (
        <Link onClick={handleClick} >Click to resend.</Link>
    );
}

export default ResendVerificationLink;