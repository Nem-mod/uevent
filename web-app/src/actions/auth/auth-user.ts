// 'use server'
// import {IUserAuthForm} from "@/types/user.types";
// import {redirect} from "next/navigation";
//
// export async function authUser(data: IUserAuthForm) {
//     try {
//         const response = await fetch(`${process.env.HOST_SERVER_URL}/auth/user/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         if (!response.ok) {
//             throw new Error(`Login failed`);
//         }
//
//         const user = await response.json();
//         console.log(user)
//
//     } catch (error) {
//         if (error instanceof Error)
//             return error.message;
//     }
//     redirect('/')
// }