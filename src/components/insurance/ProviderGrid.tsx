import React from 'react';
import { Check } from 'lucide-react';

export const INSURERS = [
  { id: 'dbv', name: 'DBV', fullName: 'DBV Insurance', bg: 'bg-blue-100', text: 'text-[#0253af]' },
  { id: 'mic', name: 'MIC', fullName: 'Bảo hiểm Quân Đội', bg: 'bg-green-100', text: 'text-green-700' },
  { id: 'pvi', name: 'PVI', fullName: 'Bảo hiểm PVI', bg: 'bg-red-100', text: 'text-red-700' },
  { id: 'tci', name: 'TCI', fullName: 'TechcomInsurance', bg: 'bg-orange-100', text: 'text-orange-700' }
];

interface ProviderGridProps {
  selectedProvider: string;
  onSelect: (id: string) => void;
  onViewDetail: (id: string) => void;
}

export default function ProviderGrid({ selectedProvider, onSelect, onViewDetail }: ProviderGridProps) {
  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 space-y-4 mb-4">
      <h3 className="font-bold text-[#1a1a1a] text-[16px]">Chọn nhà bảo hiểm</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {INSURERS.map((insurer) => {
          const isActive = selectedProvider === insurer.id;

          return (
            <div 
              key={insurer.id}
              onClick={() => onSelect(insurer.id)}
              className={`relative bg-white border rounded-[12px] flex items-center justify-center p-3 cursor-pointer min-h-[80px] transition-all
                ${isActive ? 'border-[#0253af] border-[2px]' : 'border-gray-200'}`}
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className={`w-10 h-10 ${insurer.bg} rounded flex items-center justify-center font-bold ${insurer.text} text-[12px]`}>
                  {insurer.name}
                </div>
                <span className="text-[12px] font-bold text-[#1a1a1a] text-center w-full truncate px-1 mt-1">
                  {insurer.fullName}
                </span>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetail(insurer.id);
                  }}
                  className="text-[11px] font-semibold text-[#0253af] hover:underline cursor-pointer mt-0.5 inline-block"
                >
                  Xem chi tiết
                </span>
              </div>

              {/* Dấu Tích Xanh góc trên bên phải khi Active */}
              {isActive && (
                <div className="absolute top-1.5 right-1.5 flex items-center justify-center">
                   <div className="w-[18px] h-[18px] bg-[#0253af] rounded-full flex items-center justify-center text-white">
                      <Check className="w-3 h-3" strokeWidth={3} />
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
