import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ProviderInfoProps {
  onViewDetail: () => void;
}

export default function ProviderInfo({ onViewDetail }: ProviderInfoProps) {
  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
      <h3 className="font-bold text-[#1a1a1a] text-[16px]">Đối tác bảo hiểm</h3>
      
      <div 
        onClick={onViewDetail}
        className="bg-blue-50/50 border border-blue-100 rounded-[12px] p-4 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border border-blue-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
            <Image 
              src="/assets/dbv-logo.svg" 
              alt="DBV Logo" 
              width={36} 
              height={36} 
              className="object-contain"
            />
          </div>
          <div>
            <h4 className="font-bold text-[#1a1a1a] text-[15px]">DBV Insurance</h4>
            <p className="text-[13px] text-[#4b5563] mt-0.5 pr-2 leading-snug break-words max-w-[200px]">
              Được hậu thuẫn bởi tập đoàn DB Insurance (Hàn Quốc)
            </p>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0253af] shadow-sm shadow-blue-100 group-hover:scale-105 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
