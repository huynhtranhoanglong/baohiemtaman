import React from 'react';

interface VehicleTypeSelectorProps {
  selectedType: string;
  onChangeType: (type: string) => void;
}

export default function VehicleTypeSelector({ selectedType, onChangeType }: VehicleTypeSelectorProps) {
  const types = [
    { id: '>50cc', label: 'Xe > 50cc' },
    { id: '<=50cc', label: 'Xe ≤ 50cc' },
    { id: 'electric', label: 'Xe máy điện' }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mb-4">
      {types.map(type => {
        const isActive = selectedType === type.id;
        return (
          <button
            key={type.id}
            onClick={() => onChangeType(type.id)}
            className={`whitespace-nowrap px-4 py-2 border rounded-full text-[13px] font-semibold transition-all
              ${isActive 
                ? 'border-[#0253af] bg-[#eef4ff] text-[#0253af]' 
                : 'border-gray-200 text-[#4b5563] bg-white hover:bg-gray-50'}`}
          >
            {type.label}
          </button>
        );
      })}
    </div>
  );
}
