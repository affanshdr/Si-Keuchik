import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gughjgghjyghjghjffyjfyghj';
const JWT_EXPIRES_IN = '7d'; // Token berlaku 7 hari

export interface JWTPayload {
  userId: number;
  nama: string;
  jabatan: string;
  role: string;
}

// Buat token
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// Verify token
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}