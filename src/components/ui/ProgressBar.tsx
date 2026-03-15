import React from 'react';

interface ProgressBarProps {
  currentStep: number; // 1, 2, or 3
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { id: 1, label: 'Thông tin' },
    { id: 2, label: 'Xác nhận' },
    { id: 3, label: 'Thanh toán' },
  ];

  return (
    <div className="bg-white p-4 mb-4">
      <div className="relative flex justify-between items-center px-6">
        {/* Đường nối ngang */}
        <div className="absolute top-[14px] left-10 right-10 h-[1px] bg-gray-200 z-0"></div>
        
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isPassed = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5 z-10 relative">
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-all
                  ${isActive 
                    ? 'bg-[#0253af] text-white ring-2 ring-blue-100' 
                    : isPassed 
                      ? 'bg-[#0253af] text-white opacity-80' 
                      : 'bg-[#f4f5f7] text-[#9ca3af] border border-gray-200'}
                `}
              >
                {step.id}
              </div>
              <span className={`text-[12px] ${isActive ? 'font-semibold text-[#0253af]' : 'text-[#4b5563]'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
