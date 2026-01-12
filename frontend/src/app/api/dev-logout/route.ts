import { NextResponse } from 'next/server'

export async function GET() {
    const res = NextResponse.json({
        message: 'Mock logout success',
    })

    res.cookies.delete('access_token')
    return res
}
