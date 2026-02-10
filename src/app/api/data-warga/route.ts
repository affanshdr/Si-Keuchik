import { NextResponse } from "next/server";
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET - Ambil semua data warga
export async function GET() {
  try {
    const warga = await prisma.warga.findMany({
      orderBy: { id: 'asc' }
    });
    return NextResponse.json(warga);
  } catch (error) {
    console.error('Error fetching warga:', error);
    return NextResponse.json(
      { error: "Gagal mengambil data warga" },
      { status: 500 }
    );
  }
}

// POST - Tambah data warga baru
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi - HAPUS no_kk
    if (!body.nama_lengkap || !body.no_nik || !body.alamat) {
      return NextResponse.json(
        { error: "Nama lengkap, NIK, dan alamat harus diisi" },
        { status: 400 }
      );
    }

    // Cek duplikasi NIK
    const existingWarga = await prisma.warga.findUnique({
      where: { no_nik: body.no_nik },
    });

    if (existingWarga) {
      return NextResponse.json(
        { error: "NIK sudah terdaftar" },
        { status: 400 }
      );
    }

    // Buat data baru - HAPUS no_kk
    const newWarga = await prisma.warga.create({
      data: {
        nama_lengkap: body.nama_lengkap,
        no_nik: body.no_nik,
        alamat: body.alamat,
        aktif: true
      },
    });

    return NextResponse.json(newWarga, { status: 201 });
  } catch (error) {
    console.error('Error adding warga:', error);
    return NextResponse.json(
      { error: "Gagal menambahkan data warga" },
      { status: 500 }
    );
  }
}