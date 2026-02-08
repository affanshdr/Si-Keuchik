
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="bg-gray-100 min-h-screen text-gray-800">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Sistem Informasi Administrasi <br />
            Desa Pulo Reudeup
          </h1>

          <p className="text-gray-500">
            Layanan pengurusan surat desa di kantor Geuchik <br />
            Layanan pengurusan surat desa di kantor Geuchik <br />
            Layanan pengurusan surat desa di kantor Geuchik
          </p>

          <div className="flex gap-4 pt-4">
            <button className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition">
              Ajukan Surat
            </button>

            <button className="border border-teal-700 text-teal-700 px-6 py-2 rounded-full hover:bg-teal-50 transition">
              Lacak Pengajuan
            </button>
          </div>
        </div>

        {/* Placeholder Image */}
      <div className="relative">
        <div className="w-60 h-60 bg-gray-300 rounded-xl" />
        <Image
          src="/images/Doc1.png"
          alt="Tumpukan buku"
          className="absolute bottom-0 right-10 w-56 h-auto"
          width= {244}
          height={244}
        />
      </div>
      </section>
      
      {/* PERSYARATAN */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-center font-semibold text-lg mb-6">
          Persyaratan Umum
        </h2>
          
        <div className="bg-white border border-teal-200 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-gray-200 rounded-lg" />
          <Image
          src="/images/Doc1.png"
          alt="Tumpukan buku"
          className="absolute bottom-0 right-10 w-56 h-auto"
          width= {244}
          height={244}
        />

          <ul className="list-disc text-gray-600 space-y-2">
            <li>Foto KTP (yang masih berlaku)</li>
            <li>Foto KK (Kartu Keluarga)</li>
            <li>Mengisi form online di bawah ini</li>
          </ul>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-center font-semibold text-lg mb-6">
          Form Pengajuan Surat
        </h2>

        <div className="bg-white border border-teal-200 rounded-2xl shadow-sm p-8 space-y-6">
          {/* KK */}
          <div>
            <label className="block mb-2 font-medium">
              Nomor Kartu Keluarga (KK)
            </label>
            <input
              className="w-full border border-teal-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="11111334455069847"
            />
          </div>

          {/* NIK */}
          <div>
            <label className="block mb-2 font-medium">
              Nomor Identitas Kependudukan (NIK)
            </label>
            <input
              placeholder="Masukkan 16 digit NIK"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Nama */}
          <div>
            <label className="block mb-2 font-medium">Nama Lengkap</label>
            <input
              placeholder="Masukkan nama lengkap yang akan dicantumkan di surat"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Jenis Surat */}
          <div>
            <label className="block mb-2 font-medium">Jenis Surat</label>
            <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Pilih jenis surat</option>
              <option>Surat Keterangan Usaha</option>
              <option>Surat Domisili</option>
              <option>Surat Keterangan Tidak Mampu</option>
            </select>
          </div>

          {/* Keterangan */}
          <div>
            <label className="block mb-2 font-medium">
              Keterangan (opsional)
            </label>
            <input
              placeholder="Masukkan keterangan surat"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block mb-3 font-medium">Unggah Berkas</label>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-teal-400 rounded-xl p-6 text-center text-gray-600">
                KTP telah diunggah
              </div>

              <div className="border-2 border-dashed rounded-xl p-6 text-center text-gray-600 hover:bg-gray-50 cursor-pointer">
                ↑ <br />
                Unggah KK
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <button className="bg-teal-700 text-white px-10 py-3 rounded-xl hover:bg-teal-800 transition">
              Ajukan Surat
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-300 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h4 className="font-semibold mb-2">INFO KANTOR</h4>
            <p>📍 alamat kantor geuchik</p>
            <p className="mt-2">🕒 Senin–Jumat</p>
            <p>09.00–17.00 WIB</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">NAVIGASI</h4>
            <ul className="space-y-1">
              <li>Dashboard</li>
              <li>Ajukan Surat</li>
              <li>Lacak Surat</li>
            </ul>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 py-4">
          Tim Informatika KKN Pulo Reudeup © 2026. All Rights Reserved.
        </div>
      </footer>
    </main>
    
  );
}
