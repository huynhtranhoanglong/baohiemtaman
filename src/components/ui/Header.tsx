import React from 'react';
import { Info, Headset } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        <Image src="/assets/baohiemtaman-logo.svg" alt="Logo Tâm An" width={32} height={32} className="h-8 w-auto" priority />
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">Bảo hiểm Tâm An</h1>
      </div>
      <div className="flex gap-2">
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
