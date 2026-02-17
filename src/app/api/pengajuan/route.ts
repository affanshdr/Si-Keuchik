import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Helper: Generate nomor pengajuan otomatis
async function generateNomorPengajuan(jenisSurat: string): Promise<string> {
  const prefixes: Record<string, string> = {
    domisili: 'SKD',
    kehilangan: 'SKK',
    kurang_mampu: 'SKKM',
    lanjut_usia: 'SKLU',
    usaha: 'SKU',
    belum_menikah: 'SKBM',
    meninggal: 'SKM',
    berkelakuan_baik: 'SKBB',
  };

  const prefix = prefixes[jenisSurat] || 'SRT';

  const lastPengajuan = await prisma.pengajuanSurat.findFirst({
    where: { jenis_surat: jenisSurat },
    orderBy: { id: 'desc' },
    select: { no_pengajuan: true },
  });

  let nextNumber = 1;
  if (lastPengajuan?.no_pengajuan) {
    const parts = lastPengajuan.no_pengajuan.split('/');
    const lastNumber = parseInt(parts[0]);
    if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
  }

  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');

  // Format: 001/SKD/12/2025
  return `${String(nextNumber).padStart(3, '0')}/${prefix}/${month}/${year}`;
}

// Helper: Upload foto KTP ke Supabase
async function uploadFotoKTP(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split('.').pop();
  const filename = `${uuidv4()}.${ext}`;
  const filepath = `foto-ktp/${filename}`;

  const { error } = await supabase.storage
    .from('pengajuan-surat')
    .upload(filepath, buffer, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Gagal upload foto KTP: ${error.message}`);

  const { data: urlData } = supabase.storage.from('pengajuan-surat').getPublicUrl(filepath);
  return urlData.publicUrl;
}

// POST - Buat pengajuan baru
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const wargaId = parseInt(formData.get('wargaId') as string);
    const jenis_surat = formData.get('jenis_surat') as string;

    if (!wargaId || isNaN(wargaId)) {
      return NextResponse.json({ success: false, message: 'Data warga tidak valid' }, { status: 400 });
    }

    if (!jenis_surat) {
      return NextResponse.json({ success: false, message: 'Jenis surat wajib dipilih' }, { status: 400 });
    }

    // Pastikan warga ada di database
    const warga = await prisma.warga.findUnique({ where: { id: wargaId } });
    if (!warga) {
      return NextResponse.json({ success: false, message: 'Data warga tidak ditemukan' }, { status: 404 });
    }

    // Upload foto KTP (wajib)
    const fotoKtpFile = formData.get('foto_ktp') as File | null;
    if (!fotoKtpFile || fotoKtpFile.size === 0) {
      return NextResponse.json({ success: false, message: 'Foto KTP wajib diupload untuk validasi' }, { status: 400 });
    }
    const fotoKtpUrl = await uploadFotoKTP(fotoKtpFile);

    // Parse data tambahan (JSON)
    let dataTambahan = null;
    const dataTambahanStr = formData.get('data_tambahan') as string;
    if (dataTambahanStr) {
      try {
        dataTambahan = JSON.parse(dataTambahanStr);
      } catch {
        return NextResponse.json({ success: false, message: 'Format data tambahan tidak valid' }, { status: 400 });
      }
    }

    const no_pengajuan = await generateNomorPengajuan(jenis_surat);

    const pengajuan = await prisma.pengajuanSurat.create({
      data: {
        wargaId,
        jenis_surat,
        data_tambahan: dataTambahan,

        no_pengajuan,
        status: 'diajukan',
        tanggal_pengajuan: new Date(),
      },
      include: { warga: true },
    });

    return NextResponse.json(
      { success: true, data: pengajuan, nomor_pengajuan: no_pengajuan, message: 'Pengajuan berhasil dibuat' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat membuat pengajuan' },
      { status: 500 }
    );
  }
}

// GET - Ambil daftar pengajuan
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { no_pengajuan: { contains: search, mode: 'insensitive' } },
        { warga: { no_nik: { contains: search } } },
        { warga: { nama_lengkap: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (status) whereClause.status = status;

    const [data, total] = await Promise.all([
      prisma.pengajuanSurat.findMany({
        where: whereClause,
        orderBy: { tanggal_pengajuan: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        include: { warga: true },
      }),
      prisma.pengajuanSurat.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching pengajuan:', error);
    return NextResponse.json({ success: false, message: 'Gagal mengambil data pengajuan' }, { status: 500 });
  }
}

// PUT - Update status pengajuan (untuk admin/keuchik)
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID pengajuan diperlukan' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};

    if (body.status) {
      updateData.status = body.status;
      if (body.status === 'selesai') updateData.tanggal_selesai = new Date();
    }

    if (body.status === 'ditolak' && body.catatan_penolakan) {
      updateData.catatan_penolakan = body.catatan_penolakan;
    }

    if (body.nomor_surat) updateData.nomor_surat = body.nomor_surat;
    if (body.file_surat) updateData.file_surat = body.file_surat;

    const updated = await prisma.pengajuanSurat.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { warga: true },
    });

    return NextResponse.json({ success: true, data: updated, message: 'Pengajuan berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating pengajuan:', error);
    return NextResponse.json({ success: false, message: 'Gagal memperbarui pengajuan' }, { status: 500 });
  }
}

// DELETE - Hapus pengajuan
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID pengajuan diperlukan' }, { status: 400 });
    }

    await prisma.pengajuanSurat.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ success: true, message: 'Pengajuan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting pengajuan:', error);
    return NextResponse.json({ success: false, message: 'Gagal menghapus pengajuan' }, { status: 500 });
  }
}