import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Helper: Validasi field wajib
function validateFields(fields: Record<string, any>) {
  const requiredFields = ['jenis_surat', 'no_kk', 'no_nik', 'nama_lengkap', 'alamat'];

  const missingFields = requiredFields.filter((field) => !fields[field]);
  if (missingFields.length > 0) {
    throw new Error(`Field wajib tidak lengkap: ${missingFields.join(', ')}`);
  }

  if (!/^\d{16}$/.test(fields.no_nik)) {
    throw new Error('NIK harus 16 digit angka');
  }

  if (!/^\d{16}$/.test(fields.no_kk)) {
    throw new Error('Nomor KK harus 16 digit angka');
  }
}

// Helper: Generate nomor pengajuan otomatis
async function generateNomorPengajuan(jenisSurat: string): Promise<string> {
  const prefixes: Record<string, string> = {
    'domisili': 'DOM',
    'usaha': 'USH',
    'belum-menikah': 'BM',
    'tidak-mampu': 'TM',
    'meninggal': 'MGL',
    'berkelakuan-baik': 'BB',
  };

  const prefix = prefixes[jenisSurat] || 'SRT';

  const lastPengajuan = await prisma.pengajuanSurat.findFirst({
    where: {
      jenis_surat: jenisSurat,
    },
    orderBy: {
      id: 'desc',
    },
    select: {
      no_pengajuan: true,
    },
  });

  let nextNumber = 1;
  if (lastPengajuan?.no_pengajuan) {
    const parts = lastPengajuan.no_pengajuan.split('/');
    const lastNumber = parseInt(parts[0]);
    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  
  // Format: 001/DOM/II/2025
  return `${String(nextNumber).padStart(3, '0')}/${prefix}/${month}/${year}`;
}

// Helper: Upload foto KTP ke Supabase
async function uploadFotoKTP(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split('.').pop();
  const filename = `${uuidv4()}.${ext}`;
  const filepath = `foto-ktp/${filename}`;

  const { data, error } = await supabase.storage
    .from('pengajuan-surat')
    .upload(filepath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Gagal upload foto KTP: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('pengajuan-surat')
    .getPublicUrl(filepath);

  return urlData.publicUrl;
}

// POST - Buat pengajuan baru
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const formFields = {
      jenis_surat: formData.get('jenis_surat') as string,
      no_kk: formData.get('no_kk') as string,
      no_nik: formData.get('no_nik') as string,
      nama_lengkap: formData.get('nama_lengkap') as string,
      alamat: formData.get('alamat') as string,
      keterangan: (formData.get('keterangan') as string) || null,
    };

    // Validasi field wajib
    validateFields(formFields);

    // Upload foto KTP (wajib)
    const fotoKtpFile = formData.get('foto_ktp') as File | null;
    if (!fotoKtpFile || fotoKtpFile.size === 0) {
      throw new Error('Foto KTP wajib diupload untuk validasi');
    }
    const fotoKtpUrl = await uploadFotoKTP(fotoKtpFile);

    // Parse data tambahan (JSON)
    const dataTambahanStr = formData.get('data_tambahan') as string;
    let dataTambahan = null;
    if (dataTambahanStr) {
      try {
        dataTambahan = JSON.parse(dataTambahanStr);
      } catch (e) {
        throw new Error('Format data tambahan tidak valid');
      }
    }

    // Generate nomor pengajuan
    const no_pengajuan = await generateNomorPengajuan(formFields.jenis_surat);

    // Save to database
    const pengajuan = await prisma.pengajuanSurat.create({
      data: {
        no_pengajuan,
        jenis_surat: formFields.jenis_surat,
        no_kk: formFields.no_kk,
        no_nik: formFields.no_nik,
        nama_lengkap: formFields.nama_lengkap,
        alamat: formFields.alamat,
        keterangan: formFields.keterangan,
        foto_ktp: fotoKtpUrl,
        data_tambahan: dataTambahan,
        status: 'diajukan',
        tanggal_pengajuan: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: pengajuan,
        nomor_pengajuan: no_pengajuan,
        message: 'Pengajuan berhasil dibuat',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message:
          error.message.includes('wajib') || error.message.includes('digit')
            ? error.message
            : 'Terjadi kesalahan saat membuat pengajuan',
      },
      {
        status:
          error.message.includes('wajib') || error.message.includes('digit')
            ? 400
            : 500,
      }
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
        { no_pengajuan: { contains: search } },
        { no_nik: { contains: search } },
        { nama_lengkap: { contains: search } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

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
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching pengajuan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Gagal mengambil data pengajuan',
      },
      { status: 500 }
    );
  }
}

// PUT - Update status pengajuan (untuk admin/keuchik)
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID pengajuan diperlukan',
          message: 'ID pengajuan tidak valid',
        },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {};

    // Update status
    if (body.status) {
      updateData.status = body.status;
      
      if (body.status === 'diproses') {
        updateData.tanggal_diproses = new Date();
      }
      
      if (body.status === 'selesai') {
        updateData.tanggal_selesai = new Date();
      }
    }

    // Update catatan penolakan (jika ditolak)
    if (body.status === 'ditolak' && body.catatan_penolakan) {
      updateData.catatan_penolakan = body.catatan_penolakan;
    }

    // Update data surat (setelah approved)
    if (body.nomor_surat) {
      updateData.nomor_surat = body.nomor_surat;
      updateData.tanggal_diterbitkan = new Date();
    }

    if (body.file_surat) {
      updateData.file_surat = body.file_surat;
    }

    if (body.ditandatangani_oleh) {
      updateData.ditandatangani_oleh = body.ditandatangani_oleh;
    }

    const updated = await prisma.pengajuanSurat.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Pengajuan berhasil diperbarui',
    });
  } catch (error) {
    console.error('Error updating pengajuan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Gagal memperbarui pengajuan',
      },
      { status: 500 }
    );
  }
}

// DELETE - Hapus pengajuan
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID pengajuan diperlukan',
        },
        { status: 400 }
      );
    }

    await prisma.pengajuanSurat.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Pengajuan berhasil dihapus',
    });
  } catch (error) {
    console.error('Error deleting pengajuan:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Gagal menghapus pengajuan',
      },
      { status: 500 }
    );
  }
}