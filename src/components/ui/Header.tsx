import React from 'react';
import { Info, Headset } from 'lucide-react';
import Image from 'next/image';
import { PROJECT_INFO } from '@/constants';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        <Image src="/assets/baohiemtaman-logo.svg" alt={`Logo ${PROJECT_INFO.SHORT_NAME}`} width={32} height={32} className="h-8 w-auto" priority />
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">{PROJECT_INFO.BRAND_NAME}</h1>
      </div>
      {/* Ẩn icon support và info tạm thời cho đến khi có chức năng */}
      <div className="hidden gap-2">
        <button className="w-8 h-8 flex items-center justify-center bg-[#f4f5f7] rounded-full hover:bg-gray-200 transition-colors">
          <Info className="w-4 h-4 text-[#4b5563]" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#f4f5f7] rounded-full hover:bg-gray-200 transition-colors">
          <Headset className="w-4 h-4 text-[#4b5563]" />
        </button>
      </div>
    </header>
  );
}
