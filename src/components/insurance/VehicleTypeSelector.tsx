import React from 'react';
import { Gauge, Zap } from 'lucide-react';

const MopedIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="17" r="3"/>
    <circle cx="18" cy="17" r="3"/>
    <path d="M8.5 15L11 11h3l2 4"/>
    <path d="M11 11V7h2"/>
    <path d="M13 11h4v2h-4z"/>
  </svg>
);

interface VehicleTypeSelectorProps {
  selectedType: string;
  onChangeType: (type: string) => void;
}

export default function VehicleTypeSelector({ selectedType, onChangeType }: VehicleTypeSelectorProps) {
  const types = [
    { id: '>50cc', label: 'Xe > 50cc', icon: Gauge },
    { id: '<=50cc', label: 'Xe ≤ 50cc', icon: MopedIcon },
    { id: 'electric', label: 'Xe máy điện', icon: Zap }
  ];

  return (
    <div className="flex justify-between w-full items-center pb-1 no-scrollbar pt-2 gap-2">
      {types.map(type => {
        const isActive = selectedType === type.id;
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onChangeType(type.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 px-1 sm:px-3 py-2.5 border rounded-full text-[12px] sm:text-[13px] font-semibold transition-all
              ${isActive 
                ? 'border-[#0253af] bg-[#eef4ff] text-[#0253af] shadow-sm' 
                : 'border-gray-200 text-[#4b5563] bg-white hover:bg-gray-50'}`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0253af]' : 'text-[#9ca3af]'}`} />
            <span className="truncate">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}
