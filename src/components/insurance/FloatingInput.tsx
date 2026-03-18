'use client';

import React, { useState } from 'react';

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  uppercase?: boolean;
  error?: string;
}

export default function FloatingInput({ label, value, onChange, type = 'text', placeholder, uppercase = false, error }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value && value.length > 0;
  
  // Nổi label nếu đang được focus hoặc đã có chữ
  const shrink = isFocused || isFilled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (uppercase) val = val.toUpperCase();
    // Validate phone: only digits if type=tel (Basic level)
    if (type === 'tel') {
      val = val.replace(/[^0-9]/g, '');
    }
    onChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Tìm container chứa toàn bộ form, thường là main div
      const container = e.currentTarget.closest('main') || document.body;
      if (container) {
        const inputs = Array.from(
          container.querySelectorAll('input:not([type="hidden"]):not([disabled])')
        ) as HTMLInputElement[];
        
        const index = inputs.indexOf(e.currentTarget);
        if (index > -1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          // Nếu là ô cuối cùng thì hạ bàn phím xuống
          e.currentTarget.blur();
        }
      }
    }
  };

  return (
    <div className="relative pt-2 w-full">
      {/* Label Box */}
      {shrink && (
        <label className="absolute top-0 left-3 z-10 bg-white px-1 text-[11px] font-bold text-[#4b5563] transition-all">
          {label}
        </label>
      )}

      {/* Input Box */}
      <div className={`relative border rounded-[12px] bg-white transition-colors
        ${isFocused ? 'border-[#0253af]' : 'border-gray-300'}`}
      >
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={shrink ? placeholder : label} 
          enterKeyHint="next"
          // Chỉ hiện placeholder thật khi label đã floating thu nhỏ lên trên
          className={`w-full px-4 py-[14px] text-[15px] font-medium text-[#1a1a1a] !outline-none rounded-[12px] bg-transparent placeholder-gray-400 ${error ? 'border-red-500' : ''}`}
        />
      </div>
      
      {/* Error Message */}
      {error && (
        <span className="text-red-500 text-[12px] mt-1 pl-2 inline-block">
          {error}
        </span>
      )}
    </div>
  );
}
