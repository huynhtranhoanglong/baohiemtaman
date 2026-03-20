import React from 'react';
import { Headset } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECT_INFO } from '@/constants';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity outline-none focus:ring-2 focus:ring-[#0253af] rounded-lg p-1 -ml-1">
        <Image src="/assets/baohiemtaman-logo.svg" alt={`Logo ${PROJECT_INFO.SHORT_NAME}`} width={32} height={32} className="h-8 w-auto" priority />
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">{PROJECT_INFO.BRAND_NAME}</h1>
      </Link>
      
      <div className="flex gap-2">
        <a 
          href="https://zalo.me/84777575987" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Liên hệ Zalo hỗ trợ"
          className="w-8 h-8 flex items-center justify-center bg-[#f4f5f7] rounded-full hover:bg-gray-200 transition-colors outline-none focus:ring-2 focus:ring-[#0253af]"
        >
          <Headset className="w-4 h-4 text-[#4b5563]" />
        </a>
      </div>
    </header>
  );
}
