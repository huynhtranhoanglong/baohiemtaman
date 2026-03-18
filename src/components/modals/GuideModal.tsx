'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, HelpCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['Mẫu cà vẹt xe mới', 'Mẫu chứng nhận cũ'];

  // Swipe handlers
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay backblrop */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog Bottom Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl pb-4 pt-4 px-4 shadow-xl z-50 animate-slide-up max-h-[90vh] flex flex-col">
        {/* Grabber line */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 shrink-0" />

        <div className="relative flex justify-center items-center mb-4 shrink-0">
          <h2 className="text-[18px] font-bold text-[#1a1a1a] text-center w-full px-8">Cách tìm số khung, số máy</h2>
          <button 
            onClick={onClose}
            className="absolute right-0 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-[#4b5563]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar space-y-6 pb-2">
          
          {/* Slider Section */}
          <div className="flex flex-col items-center">
            {/* Box Image Placeholder */}
            <div 
              className="w-full relative aspect-[1600/995] bg-[#d3b878] rounded-xl flex items-center justify-center mb-3 overflow-hidden shadow-inner touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEndHandler}
            >
               <div className="absolute inset-y-0 inset-x-0 w-[200%] flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 50}%)` }}>
                 <div className="w-1/2 shrink-0 flex items-center justify-center relative h-full">
                   <Image src="/assets/ca-vet-moi.webp" alt="Mẫu cà vẹt xe mới" fill className="object-contain" />
                 </div>
                 <div className="w-1/2 shrink-0 flex items-center justify-center relative h-full">
                   <Image src="/assets/ca-vet-cu.webp" alt="Mẫu cà vẹt xe cũ" fill className="object-contain" />
                 </div>
               </div>
               
               {/* Nút bấm chuyển slide hiện hình */}
               <button 
                 onClick={() => setCurrentSlide(0)} 
                 className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center z-10 transition-opacity duration-300 ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white'}`}
               >
                 <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
               </button>
               
               <button 
                 onClick={() => setCurrentSlide(1)} 
                 className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center z-10 transition-opacity duration-300 ${currentSlide === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white'}`}
               >
                 <ChevronRight className="w-5 h-5 text-[#1a1a1a]" />
               </button>
            </div>

            <span className="text-[13px] text-[#4b5563] mb-3">{slides[currentSlide]}</span>

            {/* Pagination Dots */}
            <div className="flex gap-1.5">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'w-4 bg-[#0253af]' : 'w-1.5 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-[#0253af] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#1a1a1a] text-[15px] mb-1">Cách nhanh nhất để tìm số khung, số máy?</h3>
                <p className="text-[14px] text-[#4b5563] leading-relaxed">
                  Bạn có thể tìm trên cà vẹt xe (giấy đăng ký xe), như hình hướng dẫn bên trên.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#0253af] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#1a1a1a] text-[15px] mb-1">Tại sao cần cung cấp biển số xe, số khung, số máy?</h3>
                <p className="text-[14px] text-[#4b5563] leading-relaxed mb-2">
                  Theo Thông tư 24/2023/TT-BCA của Bộ Công an, biển số xe được cấp và quản lý theo mã định danh của chủ xe.
                </p>
                <p className="text-[14px] text-[#4b5563] leading-relaxed">
                  Do vậy công ty bảo hiểm yêu cầu số khung, số máy để định tiết chính xác tài sản bảo hiểm để hỗ trợ tốt nhất khi xảy ra sự kiện bảo hiểm.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sticky Button bottom */}
        <div className="shrink-0 pt-4 bg-white">
          <button 
            onClick={onClose}
            className="w-full bg-[#0253af] text-white font-bold py-3.5 rounded-xl text-[16px] hover:bg-blue-800 transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
