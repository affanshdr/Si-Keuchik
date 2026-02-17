"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WargaData {
  id: number;
  no_nik: string;
  no_kk: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string | null;
  pekerjaan: string | null;
  alamat: string;
}

type LetterType =
  | "domisili"
  | "kehilangan"
  | "kurang_mampu"
  | "lanjut_usia"
  | "usaha"
  | "belum_menikah"
  | "meninggal"
  | "berkelakuan_baik";

const letterLabels: Record<LetterType, string> = {
  domisili: "Surat Keterangan Domisili",
  kehilangan: "Surat Keterangan Kehilangan",
  kurang_mampu: "Surat Keterangan Kurang Mampu",
  lanjut_usia: "Surat Keterangan Lanjut Usia",
  usaha: "Surat Keterangan Usaha",
  belum_menikah: "Surat Keterangan Belum Menikah",
  meninggal: "Surat Keterangan Meninggal",
  berkelakuan_baik: "Surat Keterangan Berkelakuan Baik",
};

export default function FormPengajuanSurat() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    no_nik: "",
    no_kk: "",
    namaLengkap: "",
    alamat: "",
  });

  const [selectedLetter, setSelectedLetter] = useState<LetterType | "">("");
  const [fotoKtp, setFotoKtp] = useState<File | null>(null);
  const [fotoKtpPreview, setFotoKtpPreview] = useState<string | null>(null);
  const [dataTambahan, setDataTambahan] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wargaData, setWargaData] = useState<WargaData | null>(null);
  const [nikValid, setNikValid] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "", isSuccess: false });

  useEffect(() => {
    const checkNik = async () => {
      if (formData.no_nik.length === 16) {
        try {
          const response = await fetch(`/api/check?no_nik=${formData.no_nik}`);
          const data = await response.json();
          if (!response.ok || !data.success) throw new Error(data.message || "Gagal memeriksa NIK");
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
          setNikValid(false);
          toast.error(error instanceof Error ? error.message : "Error checking NIK");
        }
      } else {
        setNikValid(null);
        setWargaData(null);
      }
    };
    const timer = setTimeout(checkNik, 800);
    return () => clearTimeout(timer);
  }, [formData.no_nik]);

  const handleFotoKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { toast.error("Ukuran file maksimal 2MB"); return; }
      if (!file.type.startsWith("image/")) { toast.error("File harus berupa gambar"); return; }
      setFotoKtp(file);
      const reader = new FileReader();
      reader.onload = () => setFotoKtpPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDT = (field: string, value: any) =>
    setDataTambahan((prev: any) => ({ ...prev, [field]: value }));

  const handleDTNested = (parent: string, field: string, value: any) =>
    setDataTambahan((prev: any) => ({ ...prev, [parent]: { ...(prev[parent] || {}), [field]: value } }));

  const canGoToNextStep = () => {
    if (currentStep === 1) return formData.no_nik.length === 16 && formData.no_kk.length === 16 && formData.namaLengkap && formData.alamat && nikValid === true;
    if (currentStep === 2) return fotoKtp !== null;
    if (currentStep === 3) return selectedLetter !== "";
    return true;
  };

  const goToNextStep = () => { if (canGoToNextStep() && currentStep < totalSteps) { setCurrentStep(currentStep + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const goToPrevStep = () => { if (currentStep > 1) { setCurrentStep(currentStep - 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalContent.isSuccess) {
      setFormData({ no_nik: "", no_kk: "", namaLengkap: "", alamat: "" });
      setSelectedLetter(""); setFotoKtp(null); setFotoKtpPreview(null);
      setDataTambahan({}); setNikValid(null); setWargaData(null); setCurrentStep(1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!nikValid || !wargaData) throw new Error("NIK tidak terdaftar di sistem");
      if (!fotoKtp) throw new Error("Foto KTP wajib diupload");
      if (!selectedLetter) throw new Error("Pilih jenis surat terlebih dahulu");

      const submitData = new FormData();
      submitData.append("wargaId", String(wargaData.id));
      submitData.append("jenis_surat", selectedLetter);
      submitData.append("foto_ktp", fotoKtp);
      if (Object.keys(dataTambahan).length > 0) submitData.append("data_tambahan", JSON.stringify(dataTambahan));

      const response = await fetch("/api/pengajuan", { method: "POST", body: submitData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Gagal membuat pengajuan");

      setModalContent({ title: "Berhasil! ✅", message: `Pengajuan berhasil dibuat dengan nomor: ${result.nomor_pengajuan}. Silakan tunggu konfirmasi dari perangkat desa.`, isSuccess: true });
      setIsModalOpen(true);
    } catch (error) {
      setModalContent({ title: "Gagal! ❌", message: error instanceof Error ? error.message : "Terjadi kesalahan", isSuccess: false });
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:outline-none placeholder:text-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Sistem Informasi Administrasi<br />
                  <span className="text-teal-600">Desa Pulo Reudeup</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  Layanan pengurusan surat administrasi kependudukan secara online untuk memudahkan warga Desa Pulo Reudeup.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  {["Proses Cepat", "Tanpa Antre", "24/7 Online"].map((text) => (
                    <div key={text} className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 hidden lg:block">
                <img src="/surat.png" alt="Ilustrasi Surat" className="relative w-64 h-64 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {currentStep > step ? "✓" : step}
                  </div>
                  {step < 4 && <div className={`flex-1 h-1 mx-2 transition-all ${currentStep > step ? "bg-teal-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 px-2">
              <span>Data Diri</span><span>Foto KTP</span><span>Jenis Surat</span><span>Selesai</span>
            </div>
          </div>

          <div className="min-h-[400px]">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Langkah 1: Data Diri Anda</h2>
                  <p className="text-gray-600 text-sm">Masukkan NIK — data lain akan otomatis terisi</p>
                </div>

                <div>
                  <label className={labelClass}>Nomor KTP (NIK) - 16 Angka <span className="text-red-500">*</span></label>
                  <input type="text" name="no_nik" value={formData.no_nik} onChange={handleInputChange} maxLength={16}
                    className={`w-full px-4 py-3 text-lg rounded-xl border-2 transition-all focus:outline-none 
                      placeholder-gray-400
                      ${nikValid === true 
                        ? "border-green-500 bg-green-50" 
                        : nikValid === false 
                        ? "border-red-500 bg-red-50" 
                        : "border-gray-300 focus:border-teal-500"}`}
                    placeholder="Contoh: 1234567890123456" />
                  {nikValid === true && <p className="text-sm text-green-600 mt-1">✓ NIK terdaftar</p>}
                  {nikValid === false && <p className="text-sm text-red-600 mt-1">✗ NIK tidak terdaftar. Silakan hubungi perangkat desa.</p>}
                </div>

                <div>
                  <label className={labelClass}>Nomor Kartu Keluarga (KK) <span className="text-red-500">*</span></label>
                  <input type="text" name="no_kk" value={formData.no_kk} onChange={handleInputChange} readOnly={!!(wargaData?.no_kk)} maxLength={16}
                    className={`${inputClass} ${wargaData?.no_kk ? 'bg-gray-50' : ''}`} placeholder="Akan terisi otomatis jika NIK terdaftar" />
                </div>

                <div>
                  <label className={labelClass}>Nama Lengkap <span className="text-red-500">*</span></label>
                  <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} readOnly={!!(wargaData?.nama_lengkap)}
                    className={`${inputClass} ${wargaData?.nama_lengkap ? 'bg-gray-50' : ''}`} placeholder="Akan terisi otomatis jika NIK terdaftar" />
                </div>

                {/* Info data dari Warga */}
                {wargaData && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-teal-700 mb-2">Data yang akan digunakan di surat:</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div><span className="text-gray-500">Tempat/Tgl Lahir:</span><br />{wargaData.tempat_lahir}, {wargaData.tanggal_lahir}</div>
                      <div><span className="text-gray-500">Jenis Kelamin:</span><br />{wargaData.jenis_kelamin}</div>
                      {wargaData.agama && <div><span className="text-gray-500">Agama:</span><br />{wargaData.agama}</div>}
                      {wargaData.pekerjaan && <div><span className="text-gray-500">Pekerjaan:</span><br />{wargaData.pekerjaan}</div>}
                    </div>
                  </div>
                )}

                <div>
                  <label className={labelClass}>Alamat Lengkap <span className="text-red-500">*</span></label>
                  <textarea
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      readOnly={!!(wargaData?.alamat)}
                      rows={3}
                      className={`${inputClass} text-gray-800 ${wargaData?.alamat ? 'bg-gray-50' : ''}`}
                      placeholder="-"
                    />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={goToNextStep} disabled={!canGoToNextStep()}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${canGoToNextStep() ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"}`}>
                    Lanjut ke Langkah 2 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Langkah 2: Upload Foto KTP</h2>
                  <p className="text-gray-600 text-sm">Diperlukan untuk validasi oleh perangkat desa</p>
                </div>
                <div className="max-w-md mx-auto">
                  {!fotoKtp ? (
                    <div className="space-y-4">
                      <input type="file" id="foto-kamera" onChange={handleFotoKtpChange} accept="image/*" capture="environment" className="hidden" />
                      <label htmlFor="foto-kamera" className="block border-2 border-teal-500 bg-teal-50 rounded-xl p-6 text-center cursor-pointer hover:bg-teal-100 transition-all">
                        <p className="text-lg text-teal-800 font-bold">📸 Foto Pakai Kamera</p>
                        <p className="text-sm text-teal-600 mt-1">Langsung ambil foto KTP sekarang</p>
                      </label>
                      <div className="flex items-center gap-3"><div className="flex-1 border-t border-gray-300"></div><span className="text-sm text-gray-500">atau</span><div className="flex-1 border-t border-gray-300"></div></div>
                      <input type="file" id="pilih-galeri" onChange={handleFotoKtpChange} accept="image/*" className="hidden" />
                      <label htmlFor="pilih-galeri" className="block border-2 border-gray-300 bg-white rounded-xl p-6 text-center cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition-all">
                        <p className="text-lg text-gray-700 font-bold">📁 Pilih dari Galeri</p>
                        <p className="text-sm text-gray-500 mt-1">Pilih foto KTP yang sudah ada (maks 2MB)</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="border-2 border-teal-500 bg-teal-50 rounded-xl p-6 text-center">
                        <p className="text-lg text-teal-700 font-medium">✅ Foto KTP Berhasil Diupload</p>
                        <p className="text-sm text-gray-600 mt-1">{fotoKtp.name}</p>
                      </div>
                      <button type="button" onClick={() => { setFotoKtp(null); setFotoKtpPreview(null); }}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg flex items-center justify-center text-xl">×</button>
                    </div>
                  )}
                  {fotoKtpPreview && <div className="mt-4"><p className="text-sm font-medium text-gray-700 mb-2">Preview:</p><img src={fotoKtpPreview} alt="Preview KTP" className="w-full rounded-lg border-2 border-gray-200" /></div>}
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={goToPrevStep} className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">← Kembali</button>
                  <button onClick={goToNextStep} disabled={!canGoToNextStep()}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${canGoToNextStep() ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"}`}>
                    Lanjut ke Langkah 3 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Langkah 3: Pilih Jenis Surat</h2>
                  <p className="text-gray-600 text-sm">Pilih surat yang ingin Anda ajukan</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(letterLabels).map(([value, label]) => (
                    <button key={value} onClick={() => { setSelectedLetter(value as LetterType); setDataTambahan({}); }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${selectedLetter === value ? "border-teal-600 bg-teal-50" : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedLetter === value ? "border-teal-600 bg-teal-600" : "border-gray-300"}`}>
                          {selectedLetter === value && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <p className="font-medium text-gray-800">{label}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedLetter && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-4 mt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Informasi Tambahan untuk {letterLabels[selectedLetter]}</h3>

                    {(selectedLetter === "domisili" || selectedLetter === "lanjut_usia" || selectedLetter === "berkelakuan_baik") && (
                      <p className="text-sm text-gray-500 italic">Tidak ada informasi tambahan yang diperlukan.</p>
                    )}

                    {selectedLetter === "kehilangan" && (
                      <div>
                        <label className={labelClass}>Dokumen yang Hilang <span className="text-red-500">*</span></label>
                        <input type="text" value={dataTambahan.alasan || ""} onChange={(e) => handleDT("alasan", e.target.value)}
                          className={inputClass} placeholder="Contoh: KTP hilang, Ijazah hilang" />
                      </div>
                    )}

                    {selectedLetter === "kurang_mampu" && (
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-gray-700">Data Orang Tua / Wali Kandung:</p>
                        {[
                          { field: "nama", label: "Nama", placeholder: "Nama lengkap" },
                          { field: "nik", label: "NIK", placeholder: "16 digit angka" },
                          { field: "tempat_lahir", label: "Tempat Lahir", placeholder: "Kota/Kabupaten" },
                          { field: "pekerjaan", label: "Pekerjaan", placeholder: "Contoh: Petani, Buruh" },
                          { field: "alamat", label: "Alamat", placeholder: "Alamat lengkap" },
                        ].map(({ field, label, placeholder }) => (
                          <div key={field}>
                            <label className={labelClass}>{label} <span className="text-red-500">*</span></label>
                            <input type="text" value={dataTambahan.orangtua?.[field] || ""} onChange={(e) => handleDTNested("orangtua", field, e.target.value)} className={inputClass} placeholder={placeholder} />
                          </div>
                        ))}
                        <div>
                          <label className={labelClass}>Tanggal Lahir <span className="text-red-500">*</span></label>
                          <input type="date" value={dataTambahan.orangtua?.tanggal_lahir || ""} onChange={(e) => handleDTNested("orangtua", "tanggal_lahir", e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Jenis Kelamin <span className="text-red-500">*</span></label>
                          <select value={dataTambahan.orangtua?.jenis_kelamin || ""} onChange={(e) => handleDTNested("orangtua", "jenis_kelamin", e.target.value)} className={inputClass}>
                            <option value="">Pilih</option><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Agama</label>
                          <select value={dataTambahan.orangtua?.agama || ""} onChange={(e) => handleDTNested("orangtua", "agama", e.target.value)} className={inputClass}>
                            <option value="">Pilih</option>
                            {["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"].map((a) => <option key={a} value={a}>{a}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    {selectedLetter === "usaha" && (
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass}>Jenis Usaha <span className="text-red-500">*</span></label>
                          <input type="text" value={dataTambahan.jenis_usaha || ""} onChange={(e) => handleDT("jenis_usaha", e.target.value)} className={inputClass} placeholder="Contoh: Usaha Nasi Ayam Geprek" />
                        </div>
                        <div>
                          <label className={labelClass}>Lokasi Usaha <span className="text-red-500">*</span></label>
                          <input type="text" value={dataTambahan.lokasi_usaha || ""} onChange={(e) => handleDT("lokasi_usaha", e.target.value)} className={inputClass} placeholder="Contoh: Desa Pulo Reudeup" />
                        </div>
                      </div>
                    )}

                    {selectedLetter === "belum_menikah" && (
                      <div>
                        <label className={labelClass}>Keperluan Surat <span className="text-red-500">*</span></label>
                        <input type="text" value={dataTambahan.keperluan || ""} onChange={(e) => handleDT("keperluan", e.target.value)} className={inputClass} placeholder="Contoh: Rekrutmen Nasional PLN Group 2025" />
                      </div>
                    )}

                    {selectedLetter === "meninggal" && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          💡 Isi data orang yang meninggal, bukan data pemohon.
                        </p>
                        {[
                          { field: "nama", label: "Nama yang Meninggal", placeholder: "Nama lengkap", type: "text" },
                          { field: "nik", label: "NIK yang Meninggal", placeholder: "16 digit angka", type: "text" },
                          { field: "umur", label: "Umur (tahun)", placeholder: "Contoh: 83", type: "number" },
                          { field: "tempat", label: "Tempat Meninggal", placeholder: "Contoh: Rumah Sakit, Rumah", type: "text" },
                          { field: "pukul", label: "Pukul Meninggal", placeholder: "Contoh: 03.00 WIB", type: "text" },
                        ].map(({ field, label, placeholder, type }) => (
                          <div key={field}>
                            <label className={labelClass}>{label} <span className="text-red-500">*</span></label>
                            <input type={type} value={dataTambahan[field] || ""} onChange={(e) => handleDT(field, e.target.value)} className={inputClass} placeholder={placeholder} />
                          </div>
                        ))}
                        <div>
                          <label className={labelClass}>Tanggal Meninggal <span className="text-red-500">*</span></label>
                          <input type="date" value={dataTambahan.tanggal || ""} onChange={(e) => handleDT("tanggal", e.target.value)} className={inputClass} />
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-sm font-semibold text-gray-700 mb-3">Data Pelapor (Ahli Waris):</p>
                          {[
                            { field: "nama", label: "Nama Pelapor", placeholder: "Nama lengkap pelapor" },
                            { field: "nik", label: "NIK Pelapor", placeholder: "16 digit angka" },
                            { field: "alamat", label: "Alamat Pelapor", placeholder: "Alamat lengkap" },
                            { field: "hubungan", label: "Hubungan Keluarga", placeholder: "Contoh: Anak, Suami, Istri" },
                          ].map(({ field, label, placeholder }) => (
                            <div key={field} className="mb-4">
                              <label className={labelClass}>{label} <span className="text-red-500">*</span></label>
                              <input type="text" value={dataTambahan.pelapor?.[field] || ""} onChange={(e) => handleDTNested("pelapor", field, e.target.value)} className={inputClass} placeholder={placeholder} />
                            </div>
                          ))}
                          <div>
                            <label className={labelClass}>Jenis Kelamin Pelapor <span className="text-red-500">*</span></label>
                            <select value={dataTambahan.pelapor?.jenis_kelamin || ""} onChange={(e) => handleDTNested("pelapor", "jenis_kelamin", e.target.value)} className={inputClass}>
                              <option value="">Pilih</option><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button onClick={goToPrevStep} className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">← Kembali</button>
                  <button onClick={goToNextStep} disabled={!canGoToNextStep()}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${canGoToNextStep() ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"}`}>
                    Lanjut ke Konfirmasi →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Langkah 4: Konfirmasi Data</h2>
                  <p className="text-gray-600 text-sm">Periksa kembali data Anda sebelum mengirim</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><p className="text-sm text-gray-600">NIK</p><p className="font-medium">{formData.no_nik}</p></div>
                    <div><p className="text-sm text-gray-600">Nomor KK</p><p className="font-medium">{formData.no_kk}</p></div>
                    <div><p className="text-sm text-gray-600">Nama Lengkap</p><p className="font-medium">{formData.namaLengkap}</p></div>
                    <div><p className="text-sm text-gray-600">Jenis Surat</p><p className="font-medium">{selectedLetter ? letterLabels[selectedLetter] : "-"}</p></div>
                    {wargaData && <>
                      <div><p className="text-sm text-gray-600">Tempat/Tgl Lahir</p><p className="font-medium">{wargaData.tempat_lahir}, {wargaData.tanggal_lahir}</p></div>
                      <div><p className="text-sm text-gray-600">Jenis Kelamin</p><p className="font-medium">{wargaData.jenis_kelamin}</p></div>
                      {wargaData.pekerjaan && <div><p className="text-sm text-gray-600">Pekerjaan</p><p className="font-medium">{wargaData.pekerjaan}</p></div>}
                    </>}
                  </div>
                  <div><p className="text-sm text-gray-600">Alamat</p><p className="font-medium">{formData.alamat}</p></div>
                  <div><p className="text-sm text-gray-600">Foto KTP</p><p className="font-medium text-green-600">✓ Sudah diupload</p></div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">ℹ️ <strong>Informasi:</strong> Setelah pengajuan dikirim, perangkat desa akan memverifikasi data Anda.</p>
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={goToPrevStep} className="px-8 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">← Kembali</button>
                  <button onClick={handleSubmit} disabled={isSubmitting}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all flex items-center gap-2 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}>
                    {isSubmitting ? <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Mengirim...</> : <><span>✓</span> Kirim Pengajuan</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-600">💬 Butuh bantuan? Hubungi perangkat desa atau datang langsung ke kantor desa</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl animate-scale-up">
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 ${modalContent.isSuccess ? "bg-green-100" : "bg-red-100"} rounded-full flex items-center justify-center mb-4`}>
                <svg className={`w-10 h-10 ${modalContent.isSuccess ? "text-green-500" : "text-red-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {modalContent.isSuccess ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />}
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${modalContent.isSuccess ? "text-green-600" : "text-red-600"}`}>{modalContent.title}</h3>
              <p className="text-gray-600 text-center mb-6 text-sm">{modalContent.message}</p>
              <button onClick={closeModal} className={`px-8 py-3 rounded-xl font-semibold ${modalContent.isSuccess ? "bg-green-500 text-white hover:bg-green-600" : "bg-red-500 text-white hover:bg-red-600"} transition-colors w-full sm:w-auto`}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
      <Footer />

      <style jsx global>{`
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: scale-up 0.2s ease-out; }
      `}</style>
    </div>
  );
}