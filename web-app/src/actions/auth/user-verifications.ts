'use server'
import {authService} from "@/services/auth.service";
export async function verifyUser(token: string, userId: string) {
    try {
        return await authService.confirmVerification(token, userId)
    } catch (e) {
        console.log(e)
    }
}