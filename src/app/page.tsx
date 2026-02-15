"use client";
import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tipe data untuk dokumen
type DocType = "KTP" | "KK" | "Surat Pengantar RT/RW" | "Surat Permohonan Bermaterai" | "Izin Usaha" | "Pas Foto 3X4 (latar Merah)" | "Surat Pernyataan tidak mampu dari RT/RW" | "Rekening listrik/air 3 bulan terakhir";

// Interface untuk data form
interface FormData {
  no_kk: string;
  no_nik: string;
  namaLengkap: string;
  alamat: string;
  keterangan: string;
}

// Interface untuk data warga dari API
interface WargaData {
  id: number;
  no_nik: string;
  no_kk: string;
  nama_lengkap: string;
  alamat: string;
}

// Jenis surat yang tersedia
type LetterType = "surat-keterangan-domisili" | "surat-keterangan-usaha" | "surat-keterangan-belum-menikah" | "surat-keterangan-tidak-mampu";

// Definisi persyaratan dokumen
const documentRequirements: Record<LetterType, { label: string; docs: DocType[] }> = {
  "surat-keterangan-domisili": {
    label: "Surat Keterangan Domisili",
    docs: ["KTP", "KK", "Surat Pengantar RT/RW", "Surat Permohonan Bermaterai"],
  },
  "surat-keterangan-usaha": {
    label: "Surat Keterangan Usaha",
    docs: ["KTP", "KK", "Surat Permohonan Bermaterai", "Surat Pengantar RT/RW", "Izin Usaha"],
  },
  "surat-keterangan-belum-menikah": {
    label: "Surat Keterangan Belum Menikah",
    docs: ["KTP", "KK", "Surat Pengantar RT/RW", "Pas Foto 3X4 (latar Merah)"],
  },
  "surat-keterangan-tidak-mampu": {
    label: "Surat Keterangan Tidak Mampu",
    docs: ["KTP", "KK", "Surat Pernyataan tidak mampu dari RT/RW", "Rekening listrik/air 3 bulan terakhir"],
  },
};

// Deskripsi dokumen
const documentDescriptions: Record<DocType, string> = {
  KTP: "Foto KTP (yang masih berlaku)",
  KK: "Foto KK (Kartu Keluarga)",
  "Surat Pengantar RT/RW": "Surat pengantar dari RT/RW setempat",
  "Surat Permohonan Bermaterai": "Surat permohonan bermaterai 6000",
  "Izin Usaha": "Dokumen izin usaha jika ada",
  "Pas Foto 3X4 (latar Merah)": "Pas foto terbaru ukuran 3x4 dengan latar belakang merah",
  "Surat Pernyataan tidak mampu dari RT/RW": "Surat pernyataan tidak mampu dari RT/RW",
  "Rekening listrik/air 3 bulan terakhir": "Rekening listrik/air 3 bulan terakhir",
};

// Inisialisasi state untuk file
const initialFileState = Object.keys(documentDescriptions).reduce((acc, doc) => {
  return { ...acc, [doc]: null };
}, {} as Record<DocType, File | null>);

// Inisialisasi state untuk preview
const initialPreviewState = Object.keys(documentDescriptions).reduce((acc, doc) => {
  return { ...acc, [doc]: null };
}, {} as Record<DocType, string | null>);

export default function FormPengajuanSurat() {
  const [selectedLetter, setSelectedLetter] = useState<LetterType | "">("");
  const [formData, setFormData] = useState<FormData>({
    no_kk: "",
    no_nik: "",
    namaLengkap: "",
    alamat: "",
    keterangan: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<Record<DocType, File | null>>(initialFileState);
  const [previews, setPreviews] = useState<Record<DocType, string | null>>(initialPreviewState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });

  const [wargaData, setWargaData] = useState<WargaData | null>(null);
  const [nikValid, setNikValid] = useState<boolean | null>(null);
  const [kkValid, setKkValid] = useState<boolean | null>(null);

  // Check NIK in database
  useEffect(() => {
    const checkNik = async () => {
      if (formData.no_nik.length === 16) {
        try {
          const response = await fetch(`/api/check?no_nik=${formData.no_nik}`);
          const data = await response.json();
          
          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Gagal memeriksa NIK');
          }

          setNikValid(data.exists);
          
          if (data.exists && data.data) {
            setWargaData(data.data);
            setFormData(prev => ({
              ...prev,
              namaLengkap: data.data.nama_lengkap || prev.namaLengkap,
              no_kk: data.data.no_kk || prev.no_kk,
              alamat: data.data.alamat || prev.alamat,
            }));
          }
        } catch (error) {
          console.error('Error checking NIK:', error);
          setNikValid(false);
          toast.error(error instanceof Error ? error.message : 'Error checking NIK');
        }
      } else {
        setNikValid(null);
      }
    };

    const timer = setTimeout(checkNik, 800);
    return () => clearTimeout(timer);
  }, [formData.no_nik]);

  // Check KK in database
  useEffect(() => {
    const checkKk = async () => {
      if (formData.no_kk.length === 16) {
        try {
          const response = await fetch(`/api/check?no_kk=${formData.no_kk}`);
          const data = await response.json();
          
          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Gagal memeriksa KK');
          }

          setKkValid(data.exists);
          
          if (data.exists && data.data) {
            setWargaData(data.data);
            setFormData(prev => ({
              ...prev,
              namaLengkap: data.data.nama_lengkap || prev.namaLengkap,
              no_kk: data.data.no_kk || prev.no_kk,
              alamat: data.data.alamat || prev.alamat,
            }));
          }
        } catch (error) {
          console.error('Error checking KK:', error);
          setKkValid(false);
          toast.error(error instanceof Error ? error.message : 'Error checking KK');
        }
      } else {
        setKkValid(null);
      }
    };

    const timer = setTimeout(checkKk, 800);
    return () => clearTimeout(timer);
  }, [formData.no_kk]);

  // Fungsi untuk menampilkan modal
  const showModal = (title: string, message: string, isSuccess: boolean) => {
    setModalContent({ title, message, isSuccess });
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Check if warga exists in database
  const checkWargaExists = async (no_kk: string, no_nik: string): Promise<boolean> => {
    try {
      console.log('Checking if warga exists:', { no_kk, no_nik });
      
      const response = await fetch(`/api/check?no_kk=${no_kk}&no_nik=${no_nik}`);
      
      console.log('checkWargaExists response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('checkWargaExists response data:', data);
      
      return data.success && data.exists && data.is_match;
    } catch (error) {
      console.error('Error in checkWargaExists:', error);
      toast.error('Gagal memverifikasi data warga');
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedLetter) {
        throw new Error("Jenis surat belum dipilih");
      }

      if (formData.no_nik.length !== 16 || formData.no_kk.length !== 16) {
        throw new Error("NIK dan Nomor KK harus 16 digit");
      }

      const missingDocs = requiredDocuments.filter((doc) => !selectedFiles[doc]);
      if (missingDocs.length > 0) {
        throw new Error(`Dokumen berikut masih diperlukan: ${missingDocs.join(", ")}`);
      }

      const wargaExists = await checkWargaExists(formData.no_kk, formData.no_nik);
      if (!wargaExists) {
        throw new Error("NIK dan Nomor KK tidak cocok dengan data warga");
      }

      const formPayload = new FormData();

      formPayload.append("jenis_surat", documentRequirements[selectedLetter].label);
      formPayload.append("no_kk", formData.no_kk);
      formPayload.append("no_nik", formData.no_nik);
      formPayload.append("nama_lengkap", formData.namaLengkap);
      formPayload.append("alamat", formData.alamat);
      formPayload.append("keterangan", formData.keterangan);

      documentRequirements[selectedLetter].docs.forEach((doc) => {
        const file = selectedFiles[doc];
        if (file) {
          formPayload.append(doc, file);
        }
      });

      const response = await fetch("/api/pengajuan", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengajukan surat");
      }

      const result = await response.json();

      showModal("Pengajuan Berhasil!", `Data pengajuan surat Anda telah berhasil dikirim dengan nomor pengajuan: ${result.data.no_pengajuan}. Silakan catat nomor ini untuk keperluan tracking.`, true);

      resetForm();
    } catch (error) {
      showModal("Pengajuan Gagal", error instanceof Error ? error.message : "Terjadi kesalahan saat mengajukan surat", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLetterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLetter(e.target.value as LetterType);
  };

  const validateFile = (file: File, docType: DocType): boolean => {
    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";
    const isDoc = file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if ((docType === "KTP" || docType === "KK" || docType === "Pas Foto 3X4 (latar Merah)") && !isImage) {
      toast.error("Hanya file gambar yang diperbolehkan untuk KTP/KK!");
      return false;
    }

    if ((docType.includes("Surat") || docType === "Izin Usaha") && !(isPDF || isDoc || isImage)) {
      toast.error("Hanya file PDF, DOC, atau gambar yang diperbolehkan!");
      return false;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB!");
      return false;
    }

    return true;
  };

  const handleFileChange = useCallback(
    (docType: DocType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!validateFile(file, docType)) return;

      setSelectedFiles((prev) => ({ ...prev, [docType]: file }));

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviews((prev) => ({
            ...prev,
            [docType]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews((prev) => ({ ...prev, [docType]: null }));
      }
    },
    []
  );

  const removeFile = (docType: DocType) => {
    setSelectedFiles((prev) => ({ ...prev, [docType]: null }));
    setPreviews((prev) => ({ ...prev, [docType]: null }));
  };

  const resetForm = () => {
    setSelectedLetter("");
    setFormData({
      no_kk: "",
      no_nik: "",
      namaLengkap: "",
      alamat: "",
      keterangan: "",
    });
    setSelectedFiles(initialFileState);
    setPreviews(initialPreviewState);
  };

  const requiredDocuments = selectedLetter ? documentRequirements[selectedLetter].docs : [];

  return (
    <div style={{ fontFamily: "var(--font-poppins)" }} className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section - Responsive */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Sistem Informasi Administrasi
                <br />
                <span className="text-teal-600">Desa Pulo Reudeup</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                Layanan pengurusan surat administrasi kependudukan secara online untuk memudahkan warga Desa Pulo Reudeup. 
                Ajukan surat Anda kapan saja, di mana saja tanpa perlu antre di kantor desa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Proses Cepat
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tanpa Antre
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  24/7 Online
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
                <img src="/surat.png" alt="Ilustrasi Surat" className="relative w-64 h-64 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section - Mobile Optimized */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2">
            Persyaratan Umum
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            Dokumen yang perlu disiapkan untuk mengajukan surat
          </p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-teal-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dokumen yang Diperlukan:</h3>
                <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-100 text-teal-600 mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span><strong className="font-semibold">Foto KTP</strong> - Kartu Tanda Penduduk yang masih berlaku</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-100 text-teal-600 mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span><strong className="font-semibold">Foto Kartu Keluarga (KK)</strong> - Untuk verifikasi data keluarga</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-100 text-teal-600 mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span><strong className="font-semibold">Dokumen Pendukung</strong> - Sesuai jenis surat yang diajukan</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-800">
                    <strong>💡 Tips:</strong> Pastikan semua dokumen difoto dengan jelas dan tidak buram untuk mempercepat proses verifikasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Mobile First Design */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Info Section */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cara Pengajuan Surat</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold text-teal-600 mr-2">1.</span>
                  <span>Isi data diri Anda dengan lengkap dan benar</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-teal-600 mr-2">2.</span>
                  <span>Pilih jenis surat yang ingin diajukan</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-teal-600 mr-2">3.</span>
                  <span>Upload dokumen persyaratan yang diminta</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-teal-600 mr-2">4.</span>
                  <span>Klik tombol "Ajukan Surat" dan simpan nomor pengajuan Anda</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-teal-600 mr-2">5.</span>
                  <span>Gunakan menu "Lacak Pengajuan" untuk memantau status surat Anda</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 sm:px-8 py-6 sm:py-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Form Pengajuan Surat
            </h2>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Nomor Kartu Keluarga (KK) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Kartu Keluarga (KK)
              </label>
              <input
                type="text"
                name="no_kk"
                placeholder="Masukkan 16 digit KK"
                className={`w-full px-4 py-3 text-gray-900 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  kkValid === null
                    ? "border-gray-300 focus:ring-teal-500"
                    : kkValid
                    ? "border-green-500 bg-green-50 focus:ring-green-500"
                    : "border-red-500 bg-red-50 focus:ring-red-500"
                }`}
                required
                value={formData.no_kk}
                onChange={handleInputChange}
                maxLength={16}
                pattern="\d{16}"
                title="Harus 16 digit angka"
              />
              {formData.no_kk.length !== 16 && formData.no_kk.length > 0 && (
                <p className="text-red-500 text-xs mt-1.5">Nomor KK harus 16 digit angka</p>
              )}
              {kkValid === false && formData.no_kk.length === 16 && (
                <p className="text-red-500 text-xs mt-1.5">Nomor KK tidak terdaftar</p>
              )}
              {kkValid && wargaData && (
                <p className="text-green-600 text-xs mt-1.5">✓ Nomor KK valid</p>
              )}
            </div>

            {/* Nomor Identitas Kependudukan (NIK) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Identitas Kependudukan (NIK)
              </label>
              <input
                type="text"
                name="no_nik"
                placeholder="Masukkan 16 digit NIK"
                className={`w-full px-4 py-3 text-gray-900 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  nikValid === null
                    ? "border-gray-300 focus:ring-teal-500"
                    : nikValid
                    ? "border-green-500 bg-green-50 focus:ring-green-500"
                    : "border-red-500 bg-red-50 focus:ring-red-500"
                }`}
                required
                value={formData.no_nik}
                onChange={handleInputChange}
                maxLength={16}
                pattern="\d{16}"
                title="Harus 16 digit angka"
              />
              {formData.no_nik.length !== 16 && formData.no_nik.length > 0 && (
                <p className="text-red-500 text-xs mt-1.5">NIK harus 16 digit angka</p>
              )}
              {nikValid === false && formData.no_nik.length === 16 && (
                <p className="text-red-500 text-xs mt-1.5">NIK tidak terdaftar</p>
              )}
              {nikValid && wargaData && (
                <p className="text-green-600 text-xs mt-1.5">
                  ✓ NIK terdaftar atas nama: {wargaData.nama_lengkap}
                </p>
              )}
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="namaLengkap"
                placeholder="Masukkan nama lengkap yang akan dipakai dalam surat"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 transition-all"
                required
                value={formData.namaLengkap}
                onChange={handleInputChange}
              />
            </div>

            {/* Alamat Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alamat Lengkap
              </label>
              <input
                type="text"
                name="alamat"
                placeholder="Masukkan alamat lengkap"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 transition-all"
                required
                value={formData.alamat}
                onChange={handleInputChange}
              />
            </div>

            {/* Jenis Surat */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jenis Surat
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 transition-all bg-white"
                required
                value={selectedLetter}
                onChange={handleLetterChange}
              >
                <option value="">Pilih jenis surat</option>
                {Object.entries(documentRequirements).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Keterangan (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keterangan (opsional)
              </label>
              <textarea
                name="keterangan"
                placeholder="Masukkan keterangan surat"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 transition-all min-h-[100px] resize-none"
                value={formData.keterangan}
                onChange={handleInputChange}
              />
            </div>

            {/* Upload Section */}
            {selectedLetter && (
              <div className="space-y-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Unggah Berkas</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {requiredDocuments.map((docType) => (
                    <div key={docType} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {docType}
                        <span className="block text-xs text-gray-500 mt-0.5 font-normal">
                          {documentDescriptions[docType]}
                        </span>
                      </label>

                      <div className="relative">
                        <input
                          type="file"
                          id={`upload-${docType}`}
                          onChange={handleFileChange(docType)}
                          accept={
                            docType === "KTP" || docType === "KK" || docType === "Pas Foto 3X4 (latar Merah)"
                              ? "image/*"
                              : ".pdf,.doc,.docx,image/*"
                          }
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor={`upload-${docType}`}
                          className={`block border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                            selectedFiles[docType]
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
                          }`}
                        >
                          {selectedFiles[docType] ? (
                            <div className="flex flex-col items-center space-y-2">
                              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-xs sm:text-sm text-teal-700 font-medium">File terupload</span>
                              <span className="text-xs text-gray-600 truncate max-w-full px-2">
                                {selectedFiles[docType]?.name}
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">Upload {docType}</p>
                                <p className="text-xs text-gray-500 mt-1">Max 2MB</p>
                              </div>
                            </div>
                          )}
                        </label>

                        {selectedFiles[docType] && (
                          <button
                            type="button"
                            onClick={() => removeFile(docType)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md flex items-center justify-center"
                            title="Hapus file"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Preview untuk gambar - Mobile Optimized */}
                      {previews[docType] && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-700 mb-1.5">Preview:</p>
                          <img
                            src={previews[docType]!}
                            alt={`Preview ${docType}`}
                            className="w-full max-h-48 object-contain rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button - Full Width on Mobile */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Ajukan Surat"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal - Mobile Optimized */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl animate-scale-up">
            <div className="flex flex-col items-center">
              {modalContent.isSuccess ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}

              <h3 className={`text-xl font-bold mb-3 ${modalContent.isSuccess ? "text-green-600" : "text-red-600"}`}>
                {modalContent.title}
              </h3>

              <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
                {modalContent.message}
              </p>

              <button
                onClick={closeModal}
                className={`px-8 py-3 rounded-xl font-semibold ${
                  modalContent.isSuccess
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                } transition-colors w-full sm:w-auto`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
      <Footer />

      <style jsx global>{`
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}






