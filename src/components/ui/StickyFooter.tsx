import React from 'react';

interface StickyFooterProps {
  totalPrice: number;
  onAction: () => void;
  buttonLabel: string;
  isVisible?: boolean;
}

export default function StickyFooter({ totalPrice, onAction, buttonLabel, isVisible = true }: StickyFooterProps) {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(totalPrice);

  return (
    <footer className={`fixed bottom-0 left-0 right-0 w-full md:max-w-md mx-auto bg-white p-4 border-t border-gray-100 z-40 shadow-[0_-8px_16px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}>
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-[14px] font-medium text-[#4b5563]">Tổng tiền</span>
        <span className="text-[20px] font-bold text-[#1a1a1a]">{formattedPrice}</span>
      </div>
      <button 
        className="w-full bg-[#0253af] text-white py-[14px] rounded-xl font-bold text-[16px] hover:bg-blue-800 active:scale-[0.98] transition-transform"
        onClick={onAction}
      >
        {buttonLabel}
      </button>
    </footer>
  );
}
