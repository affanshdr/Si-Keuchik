"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Interface untuk data warga dari API
interface WargaData {
  id: number;
  no_nik: string;
  no_kk: string;
  nama_lengkap: string;
  alamat: string;
}

// Jenis surat yang tersedia
type LetterType =
  | "domisili"
  | "usaha"
  | "belum-menikah"
  | "tidak-mampu"
  | "meninggal"
  | "berkelakuan-baik";

// Label jenis surat
const letterLabels: Record<LetterType, string> = {
  domisili: "Surat Keterangan Domisili",
  usaha: "Surat Keterangan Usaha",
  "belum-menikah": "Surat Keterangan Belum Menikah",
  "tidak-mampu": "Surat Keterangan Tidak Mampu",
  meninggal: "Surat Keterangan Meninggal",
  "berkelakuan-baik": "Surat Keterangan Berkelakuan Baik",
};

export default function FormPengajuanSurat() {
  // State untuk wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // State untuk form data
  const [formData, setFormData] = useState({
    no_nik: "",
    no_kk: "",
    namaLengkap: "",
    alamat: "",
    keterangan: "",
  });

  const [selectedLetter, setSelectedLetter] = useState<LetterType | "">("");
  const [fotoKtp, setFotoKtp] = useState<File | null>(null);
  const [fotoKtpPreview, setFotoKtpPreview] = useState<string | null>(null);

  // State untuk data tambahan (gunakan any untuk simplicity)
  const [dataTambahan, setDataTambahan] = useState<any>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wargaData, setWargaData] = useState<WargaData | null>(null);
  const [nikValid, setNikValid] = useState<boolean | null>(null);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });

  // Check NIK in database
  useEffect(() => {
    const checkNik = async () => {
      if (formData.no_nik.length === 16) {
        try {
          const response = await fetch(`/api/check?no_nik=${formData.no_nik}`);
          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || "Gagal memeriksa NIK");
          }

          setNikValid(data.exists);

          if (data.exists && data.data) {
            setWargaData(data.data);
            setFormData((prev) => ({
              ...prev,
              namaLengkap: data.data.nama_lengkap || prev.namaLengkap,
              no_kk: data.data.no_kk || prev.no_kk,
              alamat: data.data.alamat || prev.alamat,
            }));
          }
        } catch (error) {
          console.error("Error checking NIK:", error);
          setNikValid(false);
          toast.error(error instanceof Error ? error.message : "Error checking NIK");
        }
      } else {
        setNikValid(null);
      }
    };

    const timer = setTimeout(checkNik, 800);
    return () => clearTimeout(timer);
  }, [formData.no_nik]);

  // Handle foto KTP upload
  const handleFotoKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }

      setFotoKtp(file);

      const reader = new FileReader();
      reader.onload = () => {
        setFotoKtpPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFotoKtp = () => {
    setFotoKtp(null);
    setFotoKtpPreview(null);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle data tambahan change
  const handleDataTambahanChange = (field: string, value: any) => {
    setDataTambahan((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validation untuk setiap step
  const canGoToNextStep = () => {
    if (currentStep === 1) {
      return (
        formData.no_nik.length === 16 &&
        formData.no_kk.length === 16 &&
        formData.namaLengkap &&
        formData.alamat &&
        nikValid === true
      );
    }
    if (currentStep === 2) {
      return fotoKtp !== null;
    }
    if (currentStep === 3) {
      return selectedLetter !== "";
    }
    return true;
  };

  // Navigation
  const goToNextStep = () => {
    if (canGoToNextStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Show/close modal
  const showModal = (title: string, message: string, isSuccess: boolean) => {
    setModalContent({ title, message, isSuccess });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalContent.isSuccess) {
      // Reset form
      setFormData({
        no_nik: "",
        no_kk: "",
        namaLengkap: "",
        alamat: "",
        keterangan: "",
      });
      setSelectedLetter("");
      setFotoKtp(null);
      setFotoKtpPreview(null);
      setDataTambahan({});
      setNikValid(null);
      setCurrentStep(1);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!nikValid) {
        throw new Error("NIK tidak terdaftar di sistem");
      }

      if (!fotoKtp) {
        throw new Error("Foto KTP wajib diupload");
      }

      if (!selectedLetter) {
        throw new Error("Pilih jenis surat terlebih dahulu");
      }

      const submitData = new FormData();
      submitData.append("jenis_surat", selectedLetter);
      submitData.append("no_nik", formData.no_nik);
      submitData.append("no_kk", formData.no_kk);
      submitData.append("nama_lengkap", formData.namaLengkap);
      submitData.append("alamat", formData.alamat);
      submitData.append("keterangan", formData.keterangan);
      submitData.append("foto_ktp", fotoKtp);

      if (Object.keys(dataTambahan).length > 0) {
        submitData.append("data_tambahan", JSON.stringify(dataTambahan));
      }

      const response = await fetch("/api/pengajuan", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal membuat pengajuan");
      }

      showModal(
        "Berhasil! ✅",
        `Pengajuan berhasil dibuat dengan nomor: ${result.nomor_pengajuan}. Silakan tunggu konfirmasi dari perangkat desa.`,
        true
      );
    } catch (error) {
      console.error("Error submitting:", error);
      showModal(
        "Gagal! ❌",
        error instanceof Error ? error.message : "Terjadi kesalahan",
        false
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header dengan penjelasan */}
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

        {/* Form Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? "✓" : step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step ? "bg-teal-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 px-2">
              <span>Data Diri</span>
              <span>Foto KTP</span>
              <span>Jenis Surat</span>
              <span>Selesai</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* STEP 1: Data Diri */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Langkah 1: Data Diri Anda
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Masukkan nomor KTP (NIK) dan nomor KK Anda
                  </p>
                </div>

                {/* NIK */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor KTP (NIK) - 16 Angka <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_nik"
                    value={formData.no_nik}
                    onChange={handleInputChange}
                    maxLength={16}
                    className={`w-full px-4 py-3 text-lg rounded-xl border-2 transition-all ${
                      nikValid === true
                        ? "border-green-500 bg-green-50"
                        : nikValid === false
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-teal-500"
                    } focus:outline-none`}
                    placeholder="Contoh: 1234567890123456"
                  />
                  {nikValid === true && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <span>✓</span> NIK terdaftar
                    </p>
                  )}
                  {nikValid === false && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <span>✗</span> NIK tidak terdaftar. Silakan hubungi perangkat desa.
                    </p>
                  )}
                </div>

                {/* KK */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Kartu Keluarga (KK) - 16 Angka <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_kk"
                    value={formData.no_kk}
                    onChange={handleInputChange}
                    maxLength={16}
                    className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                    placeholder="Contoh: 1234567890123456"
                  />
                </div>

                {/* Nama (auto-fill) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none bg-gray-50"
                    placeholder="Otomatis terisi setelah NIK valid"
                    readOnly={nikValid === true}
                  />
                </div>

                {/* Alamat (auto-fill) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none bg-gray-50"
                    placeholder="Otomatis terisi setelah NIK valid"
                    readOnly={nikValid === true}
                  />
                </div>

                {/* Navigation */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={goToNextStep}
                    disabled={!canGoToNextStep()}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                      canGoToNextStep()
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Lanjut ke Langkah 2 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Upload Foto KTP */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Langkah 2: Upload Foto KTP
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Foto KTP diperlukan untuk validasi oleh perangkat desa
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  {!fotoKtp ? (
                    <div className="space-y-4">
                      {/* Opsi 1: Foto Langsung dengan Kamera */}
                      <div>
                        <input
                          type="file"
                          id="foto-kamera"
                          onChange={handleFotoKtpChange}
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                        />
                        <label
                          htmlFor="foto-kamera"
                          className="block border-2 border-teal-500 bg-teal-50 rounded-xl p-6 text-center cursor-pointer hover:bg-teal-100 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-lg mx-auto">
                              <svg
                                className="w-8 h-8 text-teal-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-lg text-teal-800 font-bold">
                                📸 Foto Pakai Kamera
                              </p>
                              <p className="text-sm text-teal-600 mt-1">
                                Langsung ambil foto KTP sekarang
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-sm text-gray-500">atau</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>

                      {/* Opsi 2: Pilih dari Galeri/Folder */}
                      <div>
                        <input
                          type="file"
                          id="pilih-galeri"
                          onChange={handleFotoKtpChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="pilih-galeri"
                          className="block border-2 border-gray-300 bg-white rounded-xl p-6 text-center cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mx-auto">
                              <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-lg text-gray-700 font-bold">
                                📁 Pilih dari Galeri
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Pilih foto KTP yang sudah ada (maks 2MB)
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="border-2 border-teal-500 bg-teal-50 rounded-xl p-6 text-center">
                        <div className="space-y-3">
                          <svg
                            className="h-16 w-16 text-teal-600 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-lg text-teal-700 font-medium">
                            ✅ Foto KTP Berhasil Diupload
                          </p>
                          <p className="text-sm text-gray-600">{fotoKtp.name}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={removeFotoKtp}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center text-xl"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Preview */}
                  {fotoKtpPreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img
                        src={fotoKtpPreview}
                        alt="Preview KTP"
                        className="w-full rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={goToPrevStep}
                    className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={goToNextStep}
                    disabled={!canGoToNextStep()}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                      canGoToNextStep()
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Lanjut ke Langkah 3 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Pilih Jenis Surat */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Langkah 3: Pilih Jenis Surat
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Pilih surat yang ingin Anda ajukan
                  </p>
                </div>

                {/* Pilihan Surat dalam Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(letterLabels).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setSelectedLetter(value as LetterType)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedLetter === value
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            selectedLetter === value
                              ? "border-teal-600 bg-teal-600"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedLetter === value && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{label}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Form Data Tambahan (Simpel) */}
                {selectedLetter && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-4 mt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Informasi Tambahan untuk {letterLabels[selectedLetter]}
                    </h3>

                    {/* SURAT USAHA */}
                    {selectedLetter === "usaha" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jenis Usaha Anda <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={dataTambahan.jenisUsaha || ""}
                            onChange={(e) =>
                              handleDataTambahanChange("jenisUsaha", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                            placeholder="Contoh: Warung Nasi, Toko Kelontong, dll"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lokasi Usaha <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={dataTambahan.lokasiUsaha || ""}
                            onChange={(e) =>
                              handleDataTambahanChange("lokasiUsaha", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                            placeholder="Contoh: Desa Pulo Reudeup"
                          />
                        </div>
                      </div>
                    )}

                    {/* SURAT MENINGGAL */}
                    {selectedLetter === "meninggal" && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-2">
                          💡 <strong>Catatan:</strong> Data lengkap akan diminta saat verifikasi
                          oleh perangkat desa
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama yang Meninggal <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={dataTambahan.namaAlmarhum || ""}
                            onChange={(e) =>
                              handleDataTambahanChange("namaAlmarhum", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                            placeholder="Nama lengkap"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tanggal Meninggal <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={dataTambahan.tanggalMeninggal || ""}
                            onChange={(e) =>
                              handleDataTambahanChange("tanggalMeninggal", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* SURAT TIDAK MAMPU */}
                    {selectedLetter === "tidak-mampu" && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-2">
                          💡 <strong>Catatan:</strong> Untuk keperluan bantuan atau beasiswa
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama Orang Tua/Wali <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={dataTambahan.namaOrangTua || ""}
                            onChange={(e) =>
                              handleDataTambahanChange("namaOrangTua", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                            placeholder="Nama lengkap orang tua/wali"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Keperluan Surat <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={dataTambahan.keperluan || ""}
                            onChange={(e) =>
                              handleDataTambahanChange("keperluan", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                            placeholder="Contoh: Beasiswa, Bantuan pendidikan"
                          />
                        </div>
                      </div>
                    )}

                    {/* SURAT BELUM MENIKAH */}
                    {selectedLetter === "belum-menikah" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keperluan Surat <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={dataTambahan.keperluan || ""}
                          onChange={(e) => handleDataTambahanChange("keperluan", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                          placeholder="Contoh: Melamar kerja, Pendaftaran CPNS"
                        />
                      </div>
                    )}

                    {/* SURAT DOMISILI */}
                    {selectedLetter === "domisili" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keperluan Surat <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={dataTambahan.keperluan || ""}
                          onChange={(e) => handleDataTambahanChange("keperluan", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                          placeholder="Contoh: Pembuatan SIM, Daftar sekolah"
                        />
                      </div>
                    )}

                    {/* SURAT BERKELAKUAN BAIK */}
                    {selectedLetter === "berkelakuan-baik" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keperluan Surat <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={dataTambahan.keperluan || ""}
                          onChange={(e) => handleDataTambahanChange("keperluan", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                          placeholder="Contoh: Melamar kerja, Pendaftaran sekolah"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Keterangan Tambahan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    name="keterangan"
                    value={formData.keterangan}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                    placeholder="Tambahkan catatan jika ada"
                  />
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={goToPrevStep}
                    className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={goToNextStep}
                    disabled={!canGoToNextStep()}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                      canGoToNextStep()
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Lanjut ke Konfirmasi →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Konfirmasi & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Langkah 4: Konfirmasi Data
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Periksa kembali data Anda sebelum mengirim
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">NIK</p>
                      <p className="font-medium text-gray-800">{formData.no_nik}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Nomor KK</p>
                      <p className="font-medium text-gray-800">{formData.no_kk}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Nama Lengkap</p>
                      <p className="font-medium text-gray-800">{formData.namaLengkap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jenis Surat</p>
                      <p className="font-medium text-gray-800">
                        {selectedLetter ? letterLabels[selectedLetter] : "-"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Alamat</p>
                    <p className="font-medium text-gray-800">{formData.alamat}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Foto KTP</p>
                    <p className="font-medium text-green-600 flex items-center gap-1">
                      <span>✓</span> Sudah diupload
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    ℹ️ <strong>Informasi:</strong> Setelah pengajuan dikirim, perangkat desa akan
                    memverifikasi data Anda. Anda akan dihubungi jika diperlukan informasi
                    tambahan.
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={goToPrevStep}
                    className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    } flex items-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <span>✓</span> Kirim Pengajuan
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-600">
            💬 Butuh bantuan? Hubungi perangkat desa atau datang langsung ke kantor desa
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl animate-scale-up">
            <div className="flex flex-col items-center">
              {modalContent.isSuccess ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}

              <h3
                className={`text-xl font-bold mb-3 ${
                  modalContent.isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
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