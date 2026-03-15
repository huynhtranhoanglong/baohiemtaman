import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onOpenBenefit: () => void;
  isVoluntaryIncluded: boolean;
}

export default function HeroBanner({ onOpenBenefit, isVoluntaryIncluded }: HeroBannerProps) {
  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 w-full mb-4">
      {/* Box Illustration Placeholder */}
      <div className="w-full h-[120px] bg-[#f4f5f7] rounded-[10px] flex items-center justify-center mb-4">
        <span className="text-[#9ca3af] text-sm">Illustration Placeholder</span>
      </div>

      <button 
        onClick={onOpenBenefit}
        className="w-full flex justify-between items-center mb-4 cursor-pointer outline-none"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" fill="currentColor" fillOpacity={0.1} />
          <span className="font-bold text-[16px] text-[#1a1a1a]">Quyền lợi chi trả</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <div className="space-y-3">
        <div className="flex justify-between text-[14px]">
          <span className="text-[#4b5563]">Nạn nhân</span>
          <span className="font-semibold text-[#1a1a1a]">Tối đa 150 triệu/người/vụ</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#4b5563]">Tài sản nạn nhân</span>
          <span className="font-semibold text-[#1a1a1a]">Tối đa 50 triệu/vụ</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#4b5563]">Chủ xe</span>
          {isVoluntaryIncluded ? (
            <span className="font-semibold text-primary">Tối đa 10 triệu/người/vụ (2 người)</span>
          ) : (
            <span className="font-semibold text-gray-400">Không bao gồm</span>
          )}
        </div>
      </div>
    </div>
  );
}
