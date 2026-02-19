import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

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
  return `${String(nextNumber).padStart(3, '0')}/${prefix}/${month}/${year}`;
}

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

// POST - Buat pengajuan (data flat, no wargaId)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Ambil data warga (flat)
    const nama_lengkap = formData.get('nama_lengkap') as string;
    const no_nik = formData.get('no_nik') as string;
    const no_kk = formData.get('no_kk') as string;
    const tempat_lahir = formData.get('tempat_lahir') as string;
    const tanggal_lahir = formData.get('tanggal_lahir') as string;
    const jenis_kelamin = formData.get('jenis_kelamin') as string;
    const agama = (formData.get('agama') as string) || null;
    const pekerjaan = formData.get('pekerjaan') as string;
    const alamat = formData.get('alamat') as string;
    const jenis_surat = formData.get('jenis_surat') as string;

    // Validasi field wajib
    if (!nama_lengkap || !no_nik || !no_kk || !tempat_lahir || !tanggal_lahir || !jenis_kelamin || !pekerjaan || !alamat || !jenis_surat) {
      return NextResponse.json({ success: false, message: 'Data wajib tidak lengkap' }, { status: 400 });
    }

    // Foto KTP - upload ke Supabase dan simpan URL ke DB
    const fotoKtpFile = formData.get('foto_ktp') as File | null;
    if (!fotoKtpFile || fotoKtpFile.size === 0) {
      return NextResponse.json({ success: false, message: 'Foto KTP wajib diupload' }, { status: 400 });
    }
    const foto_ktp_url = await uploadFotoKTP(fotoKtpFile); // ✅ Tangkap URL

    // Data tambahan
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
        nama_lengkap,
        no_nik,
        no_kk,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        agama,
        pekerjaan,
        alamat,
        jenis_surat,
        data_tambahan: dataTambahan,
        foto_ktp: foto_ktp_url, // ✅ Simpan URL ke DB
        no_pengajuan,
        status: 'diajukan',
        tanggal_pengajuan: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: pengajuan, nomor_pengajuan: no_pengajuan, message: 'Pengajuan berhasil dibuat' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan saat membuat pengajuan' }, { status: 500 });
  }
}

// GET - Ambil daftar pengajuan (no nested warga)
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
        { no_nik: { contains: search } },
        { nama_lengkap: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) whereClause.status = status;

    const [data, total] = await Promise.all([
      prisma.pengajuanSurat.findMany({
        where: whereClause,
        orderBy: { tanggal_pengajuan: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
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

// PUT - Update status
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) return NextResponse.json({ success: false, message: 'ID diperlukan' }, { status: 400 });

    const updateData: Record<string, any> = {};
    if (body.status) {
      updateData.status = body.status;
      if (body.status === 'selesai') updateData.tanggal_selesai = new Date();
    }
    if (body.status === 'ditolak' && body.catatan_penolakan) updateData.catatan_penolakan = body.catatan_penolakan;
    if (body.nomor_surat) updateData.nomor_surat = body.nomor_surat;
    if (body.file_surat) updateData.file_surat = body.file_surat;

    const updated = await prisma.pengajuanSurat.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated, message: 'Berhasil diperbarui' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal memperbarui' }, { status: 500 });
  }
}

// DELETE - Hapus pengajuan
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID diperlukan' }, { status: 400 });

    await prisma.pengajuanSurat.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true, message: 'Berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal menghapus' }, { status: 500 });
  }
}