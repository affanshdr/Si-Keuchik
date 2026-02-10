"use client";
import { useState, useEffect } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import ModalForm from "@/components/ModalForm";
import ModalConfirm from "@/components/ModalConfirm"; // 👈 Import modal confirm

interface Warga {
  id: number;
  nama_lengkap: string;
  no_nik: string;
  alamat: string;
}

export default function DataWarga() {
  const [wargaData, setWargaData] = useState<Warga[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 👈 State modal delete
  const [wargaToDelete, setWargaToDelete] = useState<Warga | null>(null); // 👈 Warga yang mau dihapus
  const [modalMode, setModalMode] = useState<'tambah' | 'edit'>('tambah');
  const [selectedWarga, setSelectedWarga] = useState<Warga | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nama_lengkap: '',
    no_nik: '',
    alamat: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data-warga");
      if (!response.ok) throw new Error("Gagal memuat data");
      const data = await response.json();
      setWargaData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const openTambahModal = () => {
    setModalMode('tambah');
    setFormData({ nama_lengkap: '', no_nik: '', alamat: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (warga: Warga) => {
    setModalMode('edit');
    setSelectedWarga(warga);
    setFormData({
      nama_lengkap: warga.nama_lengkap,
      no_nik: warga.no_nik,
      alamat: warga.alamat
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.nama_lengkap || !formData.no_nik || !formData.alamat) {
        throw new Error('Semua field harus diisi');
      }

      if (!/^\d{16}$/.test(formData.no_nik)) {
        throw new Error('NIK harus 16 digit angka');
      }

      const url = modalMode === 'tambah' 
        ? '/api/data-warga' 
        : `/api/data-warga/${selectedWarga?.id}`;
      
      const method = modalMode === 'tambah' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menyimpan data');
      }

      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    }
  };

  // 👇 Fungsi untuk buka modal konfirmasi delete
  const openDeleteModal = (warga: Warga) => {
    setWargaToDelete(warga);
    setIsDeleteModalOpen(true);
  };

  // 👇 Fungsi untuk execute delete
  const handleDeleteConfirm = async () => {
    if (!wargaToDelete) return;
    
    try {
      const response = await fetch(`/api/data-warga/${wargaToDelete.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus data");
      }

      setWargaData(wargaData.filter((warga) => warga.id !== wargaToDelete.id));

    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const filteredData = wargaData.filter(
    (warga) =>
      warga.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warga.no_nik.includes(searchQuery)
  );

  return (
    <div
      style={{ fontFamily: "var(--font-poppins)" }}
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-white font-sans flex"
    >
      <NavbarAdmin currentPath="/data-warga" />

      <div className="flex-1 p-8 overflow-auto ml-64">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mr-4">Data Warga</h2>
          <button
            onClick={openTambahModal}
            className="bg-[#FFD233] hover:bg-[#E6BD2E] text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <span className="mr-1">+</span> Tambah Data
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Cari Data Warga"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] bg-white outline-none transition text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD233]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FFE08A]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      NIK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Alamat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((warga) => (
                    <tr key={warga.id} className="hover:bg-[#FFF5D9]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {warga.nama_lengkap}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {warga.no_nik}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {warga.alamat}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-3">
                          <button
                            onClick={() => openEditModal(warga)}
                            className="px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full hover:from-blue-500 hover:to-blue-600 transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => openDeleteModal(warga)} // 👈 Ubah jadi buka modal
                            className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH/EDIT */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'tambah' ? 'Form Tambah Data Warga' : 'Edit Data Warga'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition text-gray-800"
              value={formData.nama_lengkap}
              onChange={(e) => setFormData({...formData, nama_lengkap: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition text-gray-800"
              value={formData.no_nik}
              onChange={(e) => setFormData({...formData, no_nik: e.target.value})}
              maxLength={16}
              pattern="\d{16}"
              title="NIK harus 16 digit angka"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition text-gray-800"
              value={formData.alamat}
              onChange={(e) => setFormData({...formData, alamat: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFD233] hover:bg-[#E6BD2E] text-gray-800 font-medium rounded-lg transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </ModalForm>

      {/* 👇 MODAL KONFIRMASI HAPUS */}
      <ModalConfirm
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Data Warga?"
        message={`Apakah Anda yakin ingin menghapus data "${wargaToDelete?.nama_lengkap}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </div>
  );
}