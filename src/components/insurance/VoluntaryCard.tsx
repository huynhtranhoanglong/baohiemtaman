import React from 'react';

interface VoluntaryCardProps {
  isIncluded: boolean; // true = Tham gia, false = Không tham gia
  onToggle: (val: boolean) => void;
}

export default function VoluntaryCard({ isIncluded, onToggle }: VoluntaryCardProps) {
  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-y-3 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="font-bold text-[#1a1a1a] text-[16px]">Bảo hiểm xe máy tự nguyện</h3>
          <span className="text-[14px] text-[#0253af] font-semibold mt-1">20.000đ/năm</span>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isIncluded}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0253af]"></div>
        </label>
      </div>

      <div className="bg-[#f4f5f7] rounded-lg p-3 text-[13px] text-[#4b5563] space-y-1">
        <p>Bảo hiểm tai nạn dành cho người ngồi trên xe (bao gồm chủ xe và người ngồi sau).</p>
        <p className="font-medium text-[#1a1a1a]">Mức bồi thường: 10 triệu/người/vụ (2 người).</p>
      </div>

    </div>
  );
}
