'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trophy, Info } from 'lucide-react';

interface InsurerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  insurerId: string | null;
}

const PROVIDER_DATA: Record<string, { title: string, bg: string, text: string, info: string, achievements: string[] }> = {
  dbv: {
    title: 'DBV Insurance (Tổng Công ty Cơ phần Bảo hiểm Hàng không)',
    bg: 'bg-blue-100',
    text: 'text-[#0253af]',
    info: 'Tiền thân là Bảo hiểm Hàng không (VNI), chính thức đổi tên thành DBV Insurance vào tháng 5/2025 với sự hậu thuẫn tài chính mạnh mẽ từ DB Insurance Hàn Quốc (nắm giữ 75% cổ phần).',
    achievements: [
      'Năng lực tài chính xuất sắc, bệ phóng từ tập đoàn DB Insurance hạng AA+ (AM Best).',
      'Ứng dụng AI và Big Data tối ưu hóa quy trình khai báo, giám định và bồi thường.',
      'Mục tiêu trở thành công ty có tốc độ bồi thường nhanh nhất thị trường.'
    ]
  }
};

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

        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-[18px] font-bold text-[#1a1a1a]">Chi tiết Nhà cung cấp</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#4b5563]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar space-y-6 pb-6 pr-1">
          {/* Header Banner */}
          <div className={`w-full rounded-[16px] ${data.bg} p-4 flex items-center justify-center min-h-[100px] relative overflow-hidden`}>
            {insurerId === 'dbv' ? (
              <Image 
                src="/assets/dbv-logo-ngang.svg" 
                alt="DBV Insurance Banner Logo" 
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
