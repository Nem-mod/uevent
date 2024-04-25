import {NextRequest, NextResponse} from "next/server";

export async function middleware(
    request: NextRequest,
    response: NextResponse
) {
    const {url, cookies} = request;
    console.log(url, cookies);
    return;
}

export const config = {
    matcher: ['/org/:path*']
}