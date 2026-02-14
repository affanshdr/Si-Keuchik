// import { Search } from "lucide-react";

export default function Page() {
  return (
    <main className="bg-gray-100 min-h-screen text-gray-800">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-5 w-full max-w-xl">
          <div className="flex justify-end gap-4 mb-8">
            <button className="border border-teal-700 text-teal-700 px-6 py-2 rounded-full hover:bg-teal-50 transition">
              Ajukan Surat
            </button>

            <button className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition">
              Lacak Pengajuan
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Lacak Status Pengajuan
          </h1>

          <p className="text-gray-500">
            Lacak pengajuan suratmu disini!!
          </p>

          {/* SEARCH */}
          <div className="relative pt-4">
            <input
              placeholder="Cari disini..."
              className="w-full border-2 border-teal-500 rounded-full px-6 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-100 p-2 rounded-full">
              {/* <Search size={18} className="text-teal-700" /> */}
            </button>
          </div>
        </div>

        {/* Placeholder Image */}
        <div className="w-64 h-48 bg-gray-300 rounded-xl" />
          
      {/* TABLE */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-center font-semibold text-xl mb-8">
          Lacak Status Pengajuan Surat
        </h2>

        <div className="overflow-hidden rounded-2xl border border-teal-700">
          <table className="w-full text-left">
            <thead className="bg-teal-800 text-white">
              <tr>
                <th className="p-4">Nama Pengaju</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Jenis Surat</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr className="border-t">
                <td className="p-4">Shaira Fathia</td>
                <td className="p-4">31/03/2026</td>
                <td className="p-4">
                  Surat Keterangan
                  <br />
                  Kurang Mampu
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    Diproses
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Adinda Muarriva</td>
                <td className="p-4">31/03/2026</td>
                <td className="p-4">
                  Surat Keterangan
                  <br />
                  Kurang Mampu
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Selesai
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* INFO BOX */}
        <div className="mt-8 border border-teal-600 rounded-2xl p-6 text-gray-600 bg-white">
          Bila status menunjukkan <strong>"Selesai"</strong>, maka Anda bisa
          langsung mengambil surat di Kantor Geuchik Desa Pulo Reudeup
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
