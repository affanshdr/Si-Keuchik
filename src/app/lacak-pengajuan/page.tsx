"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


interface Pengajuan {
  id: number;
  no_pengajuan: string;
  jenis_surat: string;
  status: string;
  tanggal_pengajuan: string;
  tanggal_selesai?: string;
  keterangan?: string;
  catatan_penolakan?: string;
}




export default function LacakPengajuan() {
  const [nik, setNik] = useState("");
  const [pengajuanList, setPengajuanList] = useState<Pengajuan[]>([]);
  const [filteredList, setFilteredList] = useState<Pengajuan[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("semua");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pengajuan berdasarkan NIK
  const handleLacak = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nik.length !== 16) {
      alert("NIK harus 16 digit angka");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/pengajuan?search=${nik}`);
      const data = await response.json();

      if (response.ok) {
        // Filter hanya pengajuan dengan NIK yang sama persis
        // Jadi ini:
        const filtered = data.data.filter((item: Pengajuan) => item.noNIK === nik);
        setPengajuanList(filtered);
        setFilteredList(filtered);
        setSelectedStatus("semua");
      } else {
        console.error("Error fetching data:", data.error);
        setPengajuanList([]);
        setFilteredList([]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setPengajuanList([]);
      setFilteredList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter berdasarkan status
  const handleFilterStatus = (status: string) => {
    setSelectedStatus(status);
    if (status === "semua") {
      setFilteredList(pengajuanList);
    } else {
      setFilteredList(
        pengajuanList.filter((item) => item.status.toLowerCase() === status.toLowerCase())
      );
    }
  };

  // Buka modal detail
  const openDetail = (pengajuan: Pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const baseClass = "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium";

    switch (status.toLowerCase()) {
      case "diproses":
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800 border border-yellow-200`}>
            <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span>
            Diproses
          </span>
        );
      case "diajukan":
        return (
          <span className={`${baseClass} bg-blue-100 text-blue-800 border border-blue-200`}>
            <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
            Diajukan
          </span>
        );
      case "selesai":
        return (
          <span className={`${baseClass} bg-green-100 text-green-800 border border-green-200`}>
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            Selesai
          </span>
        );
      case "ditolak":
        return (
          <span className={`${baseClass} bg-red-100 text-red-800 border border-red-200`}>
            <span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
            Ditolak
          </span>
        );
      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800 border border-gray-200`}>
            <span className="w-2 h-2 mr-2 bg-gray-500 rounded-full"></span>
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatJenisSurat = (jenis: string) => {
    const mapping: Record<string, string> = {
      domisili: "Surat Keterangan Domisili",
      kehilangan: "Surat Keterangan Kehilangan",
      lanjut_usia: "Surat Keterangan Lanjut Usia",
      usaha: "Surat Keterangan Usaha",
      "belum_menikah": "Surat Keterangan Belum Menikah",
      "kurang_mampu": "Surat Keterangan Kurang Mampu",
      meninggal: "Surat Keterangan Meninggal",
      "berkelakuan_baik": "Surat Keterangan Berkelakuan Baik",
    };
    return mapping[jenis] || jenis;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      {/* Hero Section - Responsive */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Lacak Status Pengajuan
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                Masukkan NIK Anda untuk melihat status pengajuan surat
              </p>

              {/* Search Form - Hero */}
              <form onSubmit={handleLacak} className="max-w-2xl mx-auto lg:mx-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Masukkan NIK (16 digit)"
                    className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 transition-all"
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                    maxLength={16}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:bg-gray-300"
                    disabled={isLoading || nik.length !== 16}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 NIK adalah nomor 16 digit yang ada di KTP Anda
                </p>
              </form>
            </div>
            <div className="flex-shrink-0 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
                <img src="/pengajuan.png" alt="Ilustrasi Pengajuan" className="relative w-64 h-64 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
          Hasil Pencarian
        </h2>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
              <p className="mt-4 text-gray-600">Mencari pengajuan Anda...</p>
            </div>
          ) : pengajuanList.length > 0 ? (
            <>
              {/* Filter Status */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Ditemukan {pengajuanList.length} Pengajuan
                    </p>
                    <p className="text-sm text-gray-600">
                      NIK: {nik} - {pengajuanList[0]?.nama_lengkap}
                    </p>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterStatus("semua")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedStatus === "semua"
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Semua ({pengajuanList.length})
                  </button>
                  <button
                    onClick={() => handleFilterStatus("diajukan")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedStatus === "diajukan"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Diajukan ({pengajuanList.filter((p) => p.status.toLowerCase() === "diajukan").length})
                  </button>
                  <button
                    onClick={() => handleFilterStatus("diproses")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedStatus === "diproses"
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Diproses ({pengajuanList.filter((p) => p.status.toLowerCase() === "diproses").length})
                  </button>
                  <button
                    onClick={() => handleFilterStatus("selesai")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedStatus === "selesai"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Selesai ({pengajuanList.filter((p) => p.status.toLowerCase() === "selesai").length})
                  </button>
                  <button
                    onClick={() => handleFilterStatus("ditolak")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedStatus === "ditolak"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Ditolak ({pengajuanList.filter((p) => p.status.toLowerCase() === "ditolak").length})
                  </button>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                {filteredList.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-teal-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Jenis Surat
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          No. Pengajuan
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Tanggal
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredList.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {formatJenisSurat(item.jenis_surat)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.no_pengajuan || "-"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(item.tanggal_pengajuan)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => openDetail(item)}
                              className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                            >
                              Lihat Detail →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Tidak ada pengajuan dengan status "{selectedStatus}"</p>
                  </div>
                )}
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredList.length > 0 ? (
                  filteredList.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => openDetail(item)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{formatJenisSurat(item.jenis_surat)}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">No: {item.no_pengajuan || "-"}</p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tanggal:</span>
                          <span className="text-gray-900">{formatDate(item.tanggal_pengajuan)}</span>
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <span className="text-teal-600 text-sm font-medium">Lihat Detail →</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Tidak ada pengajuan dengan status "{selectedStatus}"</p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-teal-50 border-t-2 border-teal-100 p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-gray-700">
                      Bila status menunjukkan <span className="font-semibold text-green-700">"Selesai"</span>, maka Anda bisa langsung mengambil surat di Kantor Geuchik Desa Pulo Reudeup. Bawa KTP asli Anda.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              {hasSearched ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-semibold mb-2">Tidak Ada Pengajuan</p>
                  <p className="text-sm text-gray-600">
                    Tidak ditemukan pengajuan dengan NIK: {nik}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pastikan NIK yang Anda masukkan sudah benar
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Gunakan pencarian di atas</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Masukkan NIK untuk melacak status pengajuan surat Anda
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal Detail */}
      {isModalOpen && selectedPengajuan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Detail Pengajuan</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-center">
                {getStatusBadge(selectedPengajuan.status)}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Jenis Surat</p>
                  <p className="font-semibold text-gray-800">
                    {formatJenisSurat(selectedPengajuan.jenis_surat)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Nomor Pengajuan</p>
                  <p className="font-semibold text-gray-800">
                    {selectedPengajuan.no_pengajuan || "-"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Nama Pemohon</p>
                  <p className="font-semibold text-gray-800">{selectedPengajuan.nama_lengkap}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">NIK</p>
                  <p className="font-semibold text-gray-800">{selectedPengajuan.no_nik}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Timeline Proses</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Pengajuan Diterima</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedPengajuan.tanggal_pengajuan)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedPengajuan.tanggal_selesai ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {selectedPengajuan.tanggal_selesai ? (
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Selesai</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedPengajuan.tanggal_selesai)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Catatan */}
              {selectedPengajuan.keterangan && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-600 font-medium mb-1">Keterangan</p>
                  <p className="text-sm text-blue-800">{selectedPengajuan.keterangan}</p>
                </div>
              )}

              {selectedPengajuan.catatan_penolakan && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-xs text-red-600 font-medium mb-1">Catatan Penolakan</p>
                  <p className="text-sm text-red-800">{selectedPengajuan.catatan_penolakan}</p>
                </div>
              )}

              {/* Button Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}




      <Footer />
    </div>
  );
}