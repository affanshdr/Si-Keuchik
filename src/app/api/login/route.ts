import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { nama, password } = await request.json();

    // Validasi input
    if (!nama || !password) {
      return NextResponse.json(
        { error: 'Nama dan password harus diisi' },
        { status: 400 }
      );
    }

    // Cari perangkat desa dengan nama dan password yang sesuai
    const perangkat = await prisma.perangkatDesa.findFirst({
      where: {
        nama: nama,
        password: password // PENTING: Nanti harus di-hash pakai bcrypt!
      }
    });

    if (!perangkat) {
      return NextResponse.json(
        { error: 'Nama atau password salah' },
        { status: 401 }
      );
    }

    // Kembalikan data perangkat tanpa password
    const { password: _, ...perangkatData } = perangkat;
    
    return NextResponse.json({
      success: true,
      user: {
        id: perangkatData.id,
        nama: perangkatData.nama,
        jabatan: perangkatData.jabatan,
        noHp: perangkatData.noHp,
        role: perangkatData.jabatan.toLowerCase() // Gunakan jabatan sebagai role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}