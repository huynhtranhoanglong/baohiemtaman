'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function BackButton({ label = "Trở về" }: { label?: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-[#0253af] text-[14px] font-medium mb-5 hover:underline transition-colors outline-none cursor-pointer"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      {label}
    </button>
  );
}
