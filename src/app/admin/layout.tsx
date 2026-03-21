'use client';

import Link from 'next/link';
import { LayoutDashboard, Mail, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-primary">Tâm An Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium"
          >
            <LayoutDashboard size={20} />
            Tổng quan
          </Link>
          
          <Link 
            href="/admin/orders" 
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition"
          >
            <ShoppingCart size={20} />
            Quản lý đơn hàng
          </Link>
          
          <Link 
            href="/admin/email" 
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium transition"
          >
            <Mail size={20} />
            Mẫu Email (Auto)
          </Link>
        </nav>

        <div className="p-4 border-t">
          {/* Note: In a real app, logout would be an API call to clear the HTTP-only cookie */}
          <button 
            onClick={() => {
              // Delete cookie on client side and clear cache
              document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full rounded-lg transition"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
