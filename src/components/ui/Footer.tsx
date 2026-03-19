import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full p-6 mt-8 bg-[#f4f5f7] border-t border-gray-200 flex flex-col gap-3 pb-28">
      <div className="text-[13px] text-[#4b5563] leading-relaxed text-center font-bold tracking-tight">
        BẢO HIỂM TÂM AN
      </div>
      <div className="text-[11.5px] text-[#6b7280] leading-relaxed text-center px-2">
        Đại lý phân phối bảo hiểm điện tử cá nhân (Nguyễn Tài Nhân) - Đối tác chính thức của Global Care & DBV.
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2 items-center justify-center text-[12.5px] font-medium mt-1">
        <Link href="/gioi-thieu" className="text-[#0253af] hover:underline">
          Giới thiệu
        </Link>
        <span className="text-gray-300">|</span>
        <Link href="/chinh-sach-bao-mat" className="text-[#0253af] hover:underline">
          Bảo mật
        </Link>
        <span className="text-gray-300">|</span>
        <Link href="/dieu-khoan-su-dung" className="text-[#0253af] hover:underline">
          Điều khoản
        </Link>
      </div>
    </footer>
  );
}
