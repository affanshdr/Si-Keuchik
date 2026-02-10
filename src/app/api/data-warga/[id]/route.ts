import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET - Ambil data warga by ID
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const wargaId = parseInt(id);
    
    const warga = await prisma.warga.findUnique({
      where: { id: wargaId }
    });

    if (!warga) {
      return NextResponse.json(
        { error: 'Data tidak ditemukan' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(warga);
  } catch (error) {
    console.error('Error fetching warga:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data' },
      { status: 500 }
    );
  }
}

// PUT - Update data warga
export async function PUT(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const wargaId = parseInt(id);

    // Validasi - HAPUS no_kk
    if (!body.nama_lengkap || !body.no_nik || !body.alamat) {
      return NextResponse.json(
        { error: 'Nama lengkap, NIK, dan alamat harus diisi' }, 
        { status: 400 }
      );
    }

    // Cek duplikasi NIK untuk warga lain
    const existingWargaWithNik = await prisma.warga.findFirst({
      where: {
        no_nik: body.no_nik,
        id: { not: wargaId }
      }
    });

    if (existingWargaWithNik) {
      return NextResponse.json(
        { error: 'NIK sudah digunakan oleh warga lain' },
        { status: 400 }
      );
    }

    // Update data - HAPUS no_kk
    const updatedWarga = await prisma.warga.update({
      where: { id: wargaId },
      data: {
        nama_lengkap: body.nama_lengkap,
        no_nik: body.no_nik,
        alamat: body.alamat
      }
    });

    return NextResponse.json({ 
      message: 'Data berhasil diperbarui',
      data: updatedWarga
    });
  } catch (error) {
    console.error('Error updating warga:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui data' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus data warga
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID tidak valid" },
        { status: 400 }
      );
    }

    await prisma.warga.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Data berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}