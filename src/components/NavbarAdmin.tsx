import Link from "next/link";
import React from "react";
import { FaClipboardList, FaUsers, FaPowerOff } from "react-icons/fa";

const NavbarAdmin = ({ currentPath }: { currentPath: string }) => {
  // Fungsi untuk menentukan apakah path saat ini aktif
  const isActive = (path: string) => currentPath === path;

  return (
    <div
      style={{ fontFamily: "var(--font-poppins)" }}
      className="w-64 h-screen bg-white text-black fixed left-0 top-0 shadow-lg font-poppins flex flex-col"
    >
      {/* Header - Dashboard Admin */}
      <div className="bg-teal-700 text-white p-6">
        <h1 className="text-xl font-semibold">Dashboard Admin</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-2">
          {/* Daftar Pengajuan */}
          <Link href="/Admin-Dashboard" passHref>
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                isActive("/Admin-Dashboard")
                  ? "bg-teal-50 text-teal-700 font-medium"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <FaClipboardList className="text-teal-600 text-lg" />
              <span className="text-sm">Daftar Pengajuan</span>
            </div>
          </Link>

          {/* Data Warga */}
          <Link href="/data-warga" passHref>
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                isActive("/data-warga")
                  ? "bg-teal-50 text-teal-700 font-medium"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <FaUsers className="text-teal-600 text-lg" />
              <span className="text-sm">Data Warga</span>
            </div>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-4">
          <Link href="/" passHref>
            <button className="flex items-center justify-center space-x-2 bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full w-full shadow-md transition-all">
              <FaPowerOff className="text-sm" />
              <span className="font-medium text-sm">Keluar</span>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
