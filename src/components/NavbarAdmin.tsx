'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { FaClipboardList, FaUsers, FaPowerOff } from "react-icons/fa";

const NavbarAdmin = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/data-warga') {
      return pathname.startsWith('/data-warga');
    }
    return pathname === path;
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      style={{ fontFamily: "var(--font-poppins)" }}
      className="w-64 h-screen bg-white text-black fixed left-0 top-0 shadow-lg font-poppins flex flex-col"
    >
      <div className="bg-teal-700 text-white p-6">
        <h1 className="text-xl font-semibold">Dashboard Admin</h1>
      </div>

      <nav className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-2">
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

        <div className="px-4 pb-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full w-full shadow-md transition-all"
          >
            <FaPowerOff className="text-sm" />
            <span className="font-medium text-sm">Keluar</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAdmin;