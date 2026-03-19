import React from 'react';
import { CheckCircle2, ChevronRight, Download, Home } from 'lucide-react';

interface SuccessCardProps {
  email: string;
  onBuyAnother: () => void;
  onGoHome: () => void;
}

export default function SuccessCard({ email, onBuyAnother, onGoHome }: SuccessCardProps) {
  return (
    <div className="flex flex-col items-center justify-center animate-slide-up">
      {/* Khối Card lớn chúc mừng */}
      <div className="bg-white rounded-[20px] p-6 shadow-lg border border-gray-100 max-w-sm w-full mx-auto text-center relative overflow-hidden">
        {/* Decorate Nền */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mt-4">
            <CheckCircle2 className="w-12 h-12 text-green-500" fill="currentColor" stroke="white" />
          </div>

          <h2 className="text-[22px] font-bold text-[#1a1a1a] mb-2">Đăng ký thành công!</h2>
          <p className="text-[14px] text-[#4b5563] mb-6 px-2 leading-relaxed">
            Cảm ơn bạn đã tin dùng Bảo hiểm Tâm An. Vui lòng kiểm tra email <span className="font-bold text-[#0253af]">{email || 'của bạn'}</span> để nhận thông tin hướng dẫn thanh toán. Giấy chứng nhận sẽ được gửi sau khi thanh toán hoàn tất.
          </p>
        </div>
      </div>

      {/* Khối Actions điều hướng */}
      <div className="w-full max-w-sm mt-8 space-y-3">
        <button
          onClick={onBuyAnother}
          className="w-full bg-[#0253af] text-white font-bold py-3.5 rounded-xl text-[16px] flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-md"
        >
          Mua tiếp cho xe khác
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>

        <button
          onClick={onGoHome}
          className="w-full bg-white text-[#4b5563] font-bold py-3.5 rounded-xl text-[15px] flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 hover:text-[#1a1a1a] transition-colors"
        >
          <Home className="w-4 h-4" />
          Về màn hình chính
        </button>
      </div>
    </div>
  );
}
