"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/admin")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/videos"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/admin/videos") || pathname?.startsWith("/admin/videos")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Gerenciar Vídeos
            </Link>
          </div>
          <Link
            href="/"
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            ← Voltar ao Catálogo
          </Link>
        </div>
      </div>
    </nav>
  );
}
