import { NextResponse } from 'next/server'

export async function GET() {
    const res = NextResponse.json({
        message: 'Mock login success',
    })

    res.cookies.set({
        name: 'access_token',
        value: 'mock-token-123',
        httpOnly: true,
        path: '/',
    })

    return res
}
