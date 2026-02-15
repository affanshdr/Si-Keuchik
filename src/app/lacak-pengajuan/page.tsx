"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Pengajuan {
  id: number;
  no_pengajuan: string;
  no_nik: string;
  nama_lengkap: string;
  jenis_surat: string;
  status: string;
  tanggal_pengajuan: string;
}

export default function LacakPengajuan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Pengajuan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const itemsPerPage = 10;

  const fetchPengajuan = async (page: number, query: string = "") => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      let url = `/api/pengajuan?page=${page}&limit=${itemsPerPage}`;
      if (query) {
        url += `&search=${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.data);
        setTotalPages(data.meta.totalPages);
      } else {
        console.error("Error fetching data:", data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setCurrentPage(1);
    fetchPengajuan(1, searchQuery);
  };


  const getStatusBadge = (status: string) => {
    const baseClass = "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium";
    
    switch(status.toLowerCase()) {
      case 'diproses':
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800 border border-yellow-200`}>
            <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></span>
            Diproses
          </span>
        );
      case 'diajukan':
        return (
          <span className={`${baseClass} bg-blue-100 text-blue-800 border border-blue-200`}>
            <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
            Diajukan
          </span>
        );
      case 'selesai':
        return (
          <span className={`${baseClass} bg-green-100 text-green-800 border border-green-200`}>
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            Selesai
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

  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
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
                Lacak pengajuan suratmu disini!
              </p>
              
              {/* Search Form - Hero */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto lg:mx-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari disini..."
                    className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
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
          Lacak Status Pengajuan Surat
        </h2>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
              <p className="mt-4 text-gray-600">Memuat data...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-teal-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Nama Pengaju
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Tanggal
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Jenis Surat
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {searchResults.map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.nama_lengkap}</div>
                          <div className="text-xs text-gray-500">NIK: {item.no_nik}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDate(item.tanggal_pengajuan)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.jenis_surat}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {searchResults.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.nama_lengkap}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">NIK: {item.no_nik}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tanggal:</span>
                        <span className="text-gray-900">{formatDate(item.tanggal_pengajuan)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Jenis Surat:</span>
                        <span className="text-gray-900 text-right">{item.jenis_surat}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                      Bila status menunjukkan <span className="font-semibold text-green-700">"Selesai"</span>, 
                      maka Anda bisa langsung mengambil surat di Kantor Geuchik Desa Pulo Reudeup
                    </p>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => {
                      const newPage = Math.max(currentPage - 1, 1);
                      setCurrentPage(newPage);
                      fetchPengajuan(newPage, searchQuery);
                    }}
                    disabled={currentPage === 1 || isLoading}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Sebelumnya
                  </button>
                  <span className="text-sm text-gray-700 font-medium">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <button
                    onClick={() => {
                      const newPage = currentPage + 1;
                      setCurrentPage(newPage);
                      fetchPengajuan(newPage, searchQuery);
                    }}
                    disabled={currentPage >= totalPages || isLoading}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Berikutnya →
                  </button>
                </div>
              )}
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
                  <p className="text-gray-600 font-medium">Tidak ditemukan pengajuan</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Coba periksa kembali NIK atau nomor pengajuan Anda
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
                    Masukkan NIK atau nomor pengajuan untuk melacak status surat Anda
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}