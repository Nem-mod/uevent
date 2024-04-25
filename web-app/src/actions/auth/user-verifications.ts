'use server'
export async function sendRegisterVerification(returnLink: string, userId: number | string) {
    try {
        return await fetch(`${process.env.HOST_SERVER_URL}/auth/user/${userId}/send/verify`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({returnLink: returnLink})
        }).then(res => {
            if (!res.ok)
                return res.json();
            return true
        });
    } catch (e) {
        console.log(e)
    }
}

export async function verifyUser(token: string, userId: string) {
    try {
        return await fetch(`${process.env.HOST_SERVER_URL}/auth/user/${userId}/validate/verify`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({token: token})
        }).then(res => res.ok);
    } catch (e) {
        console.log(e)
    }
}