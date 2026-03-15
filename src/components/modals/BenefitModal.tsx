'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface BenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BenefitModal({ isOpen, onClose }: BenefitModalProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay backblrop */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Bottom Sheet (Mobile) */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl pb-8 pt-4 px-4 shadow-xl z-50 animate-slide-up h-[90vh] flex flex-col">
        {/* Grabber line */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />

        <div className="flex justify-between items-center mb-2 shrink-0">
          <h2 className="text-[18px] font-bold text-[#1a1a1a]">Tóm tắt quyền lợi bảo hiểm</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#4b5563]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar space-y-4 pb-16">
          <div className="text-center mb-6 mt-2">
            <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-1">Phạm vi bảo hiểm</h3>
            <p className="text-[14px] text-[#4b5563]">Hiểu đúng quyền lợi để được bảo vệ trọn vẹn</p>
          </div>

          <div className="w-full flex justify-center mb-6">
            <div className="w-[200px] h-[140px] bg-blue-50 rounded-2xl flex items-center justify-center">
              <span className="text-sm text-blue-300 italic font-mono">[ẢNH MINH HỌA QUYỀN LỢI]</span>
            </div>
          </div>

          {/* ================= PHẦN 1: COMBO (BẮT BUỘC + TỰ NGUYỆN) ================= */}
          <div className="mb-6">
            <h4 className="text-[15px] font-bold text-[#1a1a1a] mb-3 pb-1 border-b-2 border-primary inline-block uppercase tracking-wide">
              Khi mua Combo (Bắt buộc + Tự nguyện)
            </h4>

            <div className="space-y-3">
              {/* Box Xanh - Người thứ ba (Bắt buộc) */}
              <div className="bg-[#f0fdf4] rounded-[16px] p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-3 border-b border-green-200/50 pb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" fill="currentColor" stroke="white" />
                  <span className="font-bold text-[#1a1a1a] text-[15px]">Đối với Người thứ ba (Nạn nhân)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Về người</span>
                    <span className="font-bold text-[#1a1a1a] max-w-[120px] text-right">Tối đa 150 triệu /người/vụ</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Về tài sản</span>
                    <span className="font-bold text-[#1a1a1a] max-w-[120px] text-right">Tối đa 50 triệu /vụ</span>
                  </div>
                </div>
              </div>

              {/* Box Xanh - Người trên xe (Tự nguyện) */}
              <div className="bg-[#f0fdf4] rounded-[16px] p-4 border border-green-100">
                <div className="flex flex-col mb-3 border-b border-green-200/50 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" fill="currentColor" stroke="white" />
                    <span className="font-bold text-[#1a1a1a] text-[15px]">Đối với Chủ xe và Người ngồi trên xe</span>
                  </div>
                  <span className="text-[12px] text-green-600 pl-7 mt-0.5">(Quyền lợi từ bảo hiểm xe máy tự nguyện)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Về người</span>
                    <span className="font-bold text-[#1a1a1a] max-w-[120px] text-right">Tối đa 10 triệu /người/vụ</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Số người bảo hiểm</span>
                    <span className="font-bold text-[#1a1a1a] max-w-[120px] text-right">02 người</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-6"></div>

          {/* ================= PHẦN 2: CHỈ MUA BẮT BUỘC ================= */}
          <div className="mb-6">
            <h4 className="text-[15px] font-bold text-[#1a1a1a] mb-3 pb-1 border-b-2 border-gray-400 inline-block uppercase tracking-wide text-gray-500">
              Nếu chỉ mua Bảo hiểm bắt buộc
            </h4>

            <div className="space-y-3 opacity-90">
              {/* Box Xanh - Chỉ bảo vệ người thứ ba */}
              <div className="bg-[#f0fdf4] rounded-[16px] p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-3 border-b border-green-200/50 pb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" fill="currentColor" stroke="white" />
                  <span className="font-bold text-[#1a1a1a] text-[15px]">Đối với Người thứ ba (Nạn nhân)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Về người</span>
                    <span className="font-bold text-[#1a1a1a] max-w-[120px] text-right">Tối đa 150 triệu /người/vụ</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Về tài sản</span>
                    <span className="font-bold text-[#1a1a1a] max-w-[120px] text-right">Tối đa 50 triệu /vụ</span>
                  </div>
                </div>
              </div>

              {/* Box Đỏ - Người trên xe KHÔNG ĐƯỢC BẢO VỆ */}
              <div className="bg-[#fff1f2] rounded-[16px] p-4 border border-red-100">
                <div className="flex flex-col mb-3 border-b border-red-200/50 pb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" fill="currentColor" stroke="white" />
                    <span className="font-bold text-[#1a1a1a] text-[15px]">Đối với Chủ xe và Người ngồi trên xe</span>
                  </div>
                  <span className="text-[12px] text-red-500 pl-7 mt-0.5">(Không bao gồm)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Chi phí y tế / tai nạn</span>
                    <span className="font-bold text-red-500 max-w-[120px] text-right">Không chi trả</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#4b5563]">Tài sản xe mình</span>
                    <span className="font-bold text-red-500 max-w-[120px] text-right">Không chi trả</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Loại Trừ */}
          <div className="border border-gray-200 rounded-[12px] overflow-hidden mt-2 mb-2">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-blue-50 transition-colors"
            >
              <div className="flex flex-col text-left">
                <span className="font-bold text-primary text-[15px]">Điều khoản loại trừ</span>
                <span className="text-[13px] text-[#4b5563] mt-0.5">Những trường hợp bảo hiểm không chi trả</span>
              </div>
              {isAccordionOpen ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAccordionOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 pt-0 bg-white text-[13px] text-[#4b5563] space-y-2">
                <ul className="list-disc pl-5 space-y-1.5 marker:text-primary">
                  <li>Hành động cố ý gây thiệt hại của chủ xe, lái xe hoặc của người bị thiệt hại.</li>
                  <li>Lái xe gây tai nạn cố ý bỏ chạy không thực hiện trách nhiệm dân sự.</li>
                  <li>Lái xe không có Giấy phép lái xe hợp lệ.</li>
                  <li>Thiệt hại gây ra do uống rượu, bia hoặc sử dụng ma túy.</li>
                  <li>Thiệt hại đối với tài sản bị mất cắp hoặc bị cướp trong vụ tai nạn.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Note mỏng màu đỏ */}
          <div className="flex items-center gap-2 mt-4 cursor-pointer hover:underline text-primary px-1">
            <div className="w-[18px] h-[18px] rounded-full border border-primary flex items-center justify-center font-bold text-[12px]">i</div>
            <span className="font-bold text-[14px]">Xem chi tiết bản quy tắc bồi thường</span>
          </div>
        </div>
      </div>
    </div>
  );
}
