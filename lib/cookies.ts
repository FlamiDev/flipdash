import { NextResponse } from "next/server";

export function setCookies(res: NextResponse, title: string, value: string, maxAge: number) {
    res.cookies.set(title, value, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: maxAge,
    });
}