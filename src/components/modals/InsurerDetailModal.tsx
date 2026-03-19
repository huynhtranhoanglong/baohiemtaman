'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trophy, Info } from 'lucide-react';
import { PROVIDER_DATA } from '@/constants';

interface InsurerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  insurerId: string | null;
}

export default function InsurerDetailModal({ isOpen, onClose, insurerId }: InsurerDetailModalProps) {
  if (!isOpen || !insurerId || !PROVIDER_DATA[insurerId]) return null;

  const data = PROVIDER_DATA[insurerId];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay backblrop */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl pb-8 pt-4 px-4 shadow-xl z-50 animate-slide-up h-[75vh] flex flex-col">
        {/* Grabber line */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />

        <div className="flex justify-center items-center mb-6 shrink-0 relative">
          <h2 className="text-[18px] font-bold text-[#1a1a1a]">Chi tiết Nhà cung cấp</h2>
          <button 
            onClick={onClose}
            className="absolute right-0 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#4b5563]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar space-y-6 pb-6 pr-1">
          {/* Header Banner */}
          <div className={`w-full rounded-[16px] ${data.bg} p-4 flex items-center justify-center min-h-[100px] relative overflow-hidden`}>
            {insurerId === 'dbv' && data.logo ? (
              <Image 
                src={data.logo}
                alt={`${data.title} Logo`}
                width={240} 
                height={80} 
                className="object-contain"
              />
            ) : (
              <span className={`font-bold text-[24px] ${data.text}`}>{insurerId.toUpperCase()}</span>
            )}
          </div>
          
          <h3 className="font-bold text-[16px] text-[#1a1a1a] text-center px-2">{data.title}</h3>

          <div className="space-y-4">
            <div className="bg-[#f4f5f7] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-[#0253af]" />
                <span className="font-bold text-[#1a1a1a] text-[15px]">Thông tin chung</span>
              </div>
              <p className="text-[14px] text-[#4b5563] leading-relaxed">
                {data.info}
              </p>
            </div>

            <div className="bg-[#fffbeb] rounded-xl p-4 border border-amber-100/50">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-[#1a1a1a] text-[15px]">Thành tựu nổi bật</span>
              </div>
              <ul className="space-y-2.5">
                {data.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span className="text-[14px] text-[#4b5563] leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
