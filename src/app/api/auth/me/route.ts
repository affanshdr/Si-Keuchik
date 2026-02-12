// import { NextRequest, NextResponse } from 'next/server';
// import { signToken, verifyToken } from '../../../../../lib/jwt';
// import { parse } from 'cookie';

// export async function GET(request: NextRequest) {
//   try {
//     // Get cookie from request
//     const cookies = parse(request.headers.get('cookie') || '');
//     const token = cookies['auth-token'];

//     if (!token) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     // Verify token
//     const payload = verifyToken(token);

//     if (!payload) {
//       return NextResponse.json(
//         { error: 'Invalid token' },
//         { status: 401 }
//       );
//     }

//     // Return user data
//     return NextResponse.json({
//       user: {
//         id: payload.userId,
//         nama: payload.nama,
//         jabatan: payload.jabatan,
//         role: payload.role
//       }
//     });

//   } catch (error) {
//     console.error('Auth verification error:', error);
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
// }