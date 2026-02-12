// import { NextResponse } from 'next/server';
// import { serialize } from 'cookie';

// export async function POST() {
//   // Clear cookie
//   const cookie = serialize('auth-token', '', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 0, // Expire immediately
//     path: '/'
//   });

//   const response = NextResponse.json({
//     success: true,
//     message: 'Logout berhasil'
//   });

//   response.headers.set('Set-Cookie', cookie);
//   return response;
// }