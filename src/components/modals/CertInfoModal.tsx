import React from 'react';
import { X, FileText, Mail } from 'lucide-react';

interface CertInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertInfoModal({ isOpen, onClose }: CertInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay backblrop */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog Bottom Sheet (Mobile) */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl pb-8 pt-4 px-4 shadow-xl z-50 animate-slide-up">
        {/* Grabber line (for aesthetic mobile look) */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-[#1a1a1a]">Giấy chứng nhận điện tử là gì?</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#4b5563]" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-[#f4f5f7] p-4 rounded-xl">
            <div className="flex-shrink-0 mt-0.5">
              <FileText className="w-6 h-6 text-[#0253af]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1a1a1a] text-[15px] mb-1">Có hiệu lực tương đương bản cứng</h3>
              <p className="text-[13px] text-[#4b5563] leading-relaxed">
                Theo Nghị định 67/2023/NĐ-CP, Giấy chứng nhận điện tử có giá trị pháp lý tương đương bản cứng. Bạn có thể yên tâm sử dụng để xuất trình khi CSGT yêu cầu.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#f4f5f7] p-4 rounded-xl">
            <div className="flex-shrink-0 mt-0.5">
              <Mail className="w-6 h-6 text-[#0253af]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1a1a1a] text-[15px] mb-1">Được gửi về email của bạn</h3>
              <p className="text-[13px] text-[#4b5563] leading-relaxed">
                Ngay sau khi thanh toán thành công, Giấy chứng nhận bảo hiểm điện tử (file PDF) sẽ tự động được gửi tới địa chỉ Email bạn đã đăng ký.
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full mt-6 bg-[#0253af] text-white font-bold py-3.5 rounded-xl text-[16px] hover:bg-blue-800 transition-colors"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
}
