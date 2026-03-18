'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import ProgressBar from '@/components/ui/ProgressBar';
import HeroBanner from '@/components/insurance/HeroBanner';
import DurationCard from '@/components/insurance/DurationCard';
import VehicleTypeSelector from '@/components/insurance/VehicleTypeSelector';
import CertInfoModal from '@/components/modals/CertInfoModal';
import GuideModal from '@/components/modals/GuideModal';
import BenefitModal from '@/components/modals/BenefitModal';
import InsurerDetailModal from '@/components/modals/InsurerDetailModal';
import FloatingInput from '@/components/insurance/FloatingInput';
import ProviderInfo from '@/components/insurance/ProviderInfo';
import ConfirmSummary from '@/components/insurance/ConfirmSummary';
import SuccessCard from '@/components/insurance/SuccessCard';
import StickyFooter from '@/components/ui/StickyFooter';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  
  const [isInsurerModalOpen, setIsInsurerModalOpen] = useState(false);
  const [viewedInsurerId, setViewedInsurerId] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    duration: 1,
    startDate: today,
    endDate: '',
    vehicleType: '>50cc',
    ownerName: '',
    address: '',
    licensePlate: '',
    engineNumber: '',
    chassisNumber: '',
    email: '',
    phone: '',
    isVoluntaryIncluded: true,
    provider: 'dbv'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    const { ownerName, address, licensePlate, engineNumber, chassisNumber, email, phone } = formData;

    if (!ownerName.trim()) newErrors.ownerName = 'Vui lòng nhập tên chủ xe';
    if (!address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ thường trú';
    if (!licensePlate.trim()) newErrors.licensePlate = 'Vui lòng nhập biển số xe';
    if (!engineNumber.trim()) newErrors.engineNumber = 'Vui lòng nhập số máy';
    if (!chassisNumber.trim()) newErrors.chassisNumber = 'Vui lòng nhập số khung';
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Vui lòng nhập đúng định dạng Email';
    }

    // Validate Phone (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim() || !phoneRegex.test(phone)) {
      newErrors.phone = 'Vui lòng nhập đủ 10 số điện thoại';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPrice = () => {
    let basePrice = formData.vehicleType === '>50cc' ? 66000 : 60500;
    
    // Nếu tham gia tự nguyện thì cộng thêm 20,000đ/năm
    if (formData.isVoluntaryIncluded) {
      basePrice += 20000;
    }
    
    return basePrice * formData.duration;
  };

  // Hàm Reset Mua Xe Khác
  const handleBuyAnother = () => {
    setFormData(prev => ({
      ...prev,
      duration: 1,
      vehicleType: '>50cc',
      licensePlate: '',
      chassisNumber: '',
      engineNumber: '',
      ownerName: '',
      address: '',
      email: '',
      phone: '',
      isVoluntaryIncluded: true,
      provider: 'dbv'
    }));
    // Reset lịch
    updateField('startDate', today);
    const end = new Date(today);
    end.setFullYear(end.getFullYear() + 1);
    updateField('endDate', end.toISOString().split('T')[0]);
    
    setCurrentStep(1);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Bước 3: Hoàn tất thì giấu bớt phần tử thừa đổi Background
  const isStep3 = currentStep === 3;

  return (
    <div className={`min-h-screen ${isStep3 ? 'bg-[#f4f5f7]' : 'bg-[#fff]'} pb-32 font-sans flex justify-center`}>
      <div className={`w-full max-w-md ${isStep3 ? '' : 'bg-[#f4f5f7]'} min-h-screen relative flex flex-col shadow-xl`}>
        
        {/* Header & Progress (Giấu nếu đang ở trang 3) */}
        {!isStep3 && (
          <>
            <Header />
            <ProgressBar currentStep={currentStep} />
          </>
        )}

        <main className={`flex-grow px-4 ${isStep3 ? 'pt-6' : 'space-y-4'}`}>
          
          {/* TRẠNG THÁI BƯỚC 1: NHẬP LIỆU */}
          {currentStep === 1 && (
            <>
              <HeroBanner 
                onOpenBenefit={() => setIsBenefitModalOpen(true)} 
                isVoluntaryIncluded={formData.isVoluntaryIncluded}
                onToggleVoluntary={(val) => updateField('isVoluntaryIncluded', val as any)}
              />
              
              <DurationCard 
            duration={formData.duration}
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChangeDuration={(val) => updateField('duration', val as any)}
            onChangeStartDate={(val) => updateField('startDate', val)}
            setEndDate={(val) => updateField('endDate', val)}
          />
          
          {/* Card Nhập Form Chính */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
            <h3 className="font-bold text-[#1a1a1a] text-[16px]">Thông tin xe</h3>
            
            <FloatingInput 
              label="Tên chủ xe *" 
              placeholder="VD: Nguyễn Văn A"
              value={formData.ownerName} 
              onChange={(val) => { updateField('ownerName', val); if (errors.ownerName) setErrors({...errors, ownerName: ''}); }} 
              error={errors.ownerName}
            />
            
            <FloatingInput 
              label="Địa chỉ thường trú *" 
              placeholder="Số nhà, tên đường, phường/xã..."
              value={formData.address} 
              onChange={(val) => { updateField('address', val); if (errors.address) setErrors({...errors, address: ''}); }} 
              error={errors.address}
            />
            
            <VehicleTypeSelector 
              selectedType={formData.vehicleType} 
              onChangeType={(val) => updateField('vehicleType', val)} 
            />
            
            <FloatingInput 
              label="Biển số xe *" 
              placeholder="VD: 59P2-12345"
              uppercase={true}
              value={formData.licensePlate} 
              onChange={(val) => { updateField('licensePlate', val); if (errors.licensePlate) setErrors({...errors, licensePlate: ''}); }} 
              error={errors.licensePlate}
            />

            <FloatingInput 
              label="Số máy *" 
              placeholder="Nhập số máy"
              uppercase={true}
              value={formData.engineNumber} 
              onChange={(val) => { updateField('engineNumber', val); if (errors.engineNumber) setErrors({...errors, engineNumber: ''}); }} 
              error={errors.engineNumber}
            />

            <FloatingInput 
              label="Số khung *" 
              placeholder="Nhập số khung"
              uppercase={true}
              value={formData.chassisNumber} 
              onChange={(val) => { updateField('chassisNumber', val); if (errors.chassisNumber) setErrors({...errors, chassisNumber: ''}); }} 
              error={errors.chassisNumber}
            />

            <button 
              type="button" 
              onClick={() => setIsGuideModalOpen(true)}
              className="text-[#0253af] text-[13px] font-bold text-left hover:underline select-none w-fit outline-none"
            >
              Cách tìm số khung, số máy
            </button>
          </div>

          <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-[#1a1a1a] text-[16px]">Người nhận giấy chứng nhận</h3>
              <p className="text-[13.5px] text-[#4b5563] leading-relaxed pr-1">
                Vui lòng điền chính xác thông tin liên lạc đang sử dụng. Giấy chứng nhận bảo hiểm điện tử sẽ được tự động gửi vào Email / Zalo ngay sau khi thanh toán.
              </p>
            </div>
            <FloatingInput 
              label="Email *" 
              type="email"
              placeholder="VD: example@gmail.com"
              value={formData.email} 
              onChange={(val) => { updateField('email', val); if (errors.email) setErrors({...errors, email: ''}); }} 
              error={errors.email}
            />
            <FloatingInput 
              label="Số điện thoại *" 
              type="tel"
              placeholder="Nhập số điện thoại"
              value={formData.phone} 
              onChange={(val) => { updateField('phone', val); if (errors.phone) setErrors({...errors, phone: ''}); }} 
              error={errors.phone}
            />

            <button 
              type="button" 
              onClick={() => setIsCertModalOpen(true)}
              className="text-[#0253af] text-[13px] font-bold text-left hover:underline select-none w-fit outline-none"
            >
              Giấy chứng nhận điện tử là gì?
            </button>
          </div>

              <ProviderInfo 
                onViewDetail={() => {
                  setViewedInsurerId('dbv');
                  setIsInsurerModalOpen(true);
                }}
              />
            </>
          )}

          {/* TRẠNG THÁI BƯỚC 2: XÁC NHẬN */}
          {currentStep === 2 && (
            <ConfirmSummary 
              formData={formData} 
              onEdit={() => setCurrentStep(1)} 
            />
          )}

          {/* TRẠNG THÁI BƯỚC 3: THÀNH CÔNG */}
          {currentStep === 3 && (
            <SuccessCard 
              email={formData.email}
              onBuyAnother={handleBuyAnother}
              onGoHome={handleBuyAnother}
            />
          )}

        </main>

        {/* Sticky footer bị giấu ở trang 3 */}
        {!isStep3 && (
          <StickyFooter 
            totalPrice={getPrice()} 
            buttonLabel={isSubmitting ? "Đang xử lý..." : (currentStep === 1 ? "Tiếp tục" : "Thanh toán")} 
            onAction={async () => {
              if (currentStep === 1) {
                // Sang Bước 2: Validate sương sương rồi cho qua
                if (validateStep1()) {
                  setCurrentStep(2);
                  // Scroll top to see the confirm page clearly
                  window.scrollTo(0, 0);
                } else {
                  // Hiển thị lỗi nhưng nên scroll lên vị trí lỗi đầu tiên để user thấy (tuỳ chọn)
                  // Tạm thời đơn giản nhất cứ để vậy
                }
              } else if (currentStep === 2) {
                // Gọi API backend lưu spreadsheet 
                if (isSubmitting) return;

                setIsSubmitting(true);
                try {
                  const payload = {
                    ...formData,
                    totalPrice: getPrice(),
                    createdAt: new Date().toISOString(),
                  };

                  const res = await fetch('/api/submit-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  });

                  if (!res.ok) {
                    console.error("Lỗi khi gửi API", await res.text());
                    // Báo lỗi bằng alert nếu muốn, hoặc silent & vẫn qua bước 3 (tuỳ policy)
                    // Tạm cho qua luôn bước 3 để demo UI mượt mà:
                    alert('Lỗi gửi API Sheets (thiếu .env), nhưng vẫn chuyển thử trang Thành Công!');
                  }
                  
                  // Move to Success UI
                  setCurrentStep(3);
                } catch (error) {
                  console.error('Fetch error:', error);
                  alert('Lỗi mạng nội bộ.');
                } finally {
                  setIsSubmitting(false);
                }
              }
            }} 
          />
        )}

        {/* --- Modals & Popups --- */}
        <CertInfoModal 
          isOpen={isCertModalOpen} 
          onClose={() => setIsCertModalOpen(false)} 
        />
        
        <GuideModal 
          isOpen={isGuideModalOpen} 
          onClose={() => setIsGuideModalOpen(false)} 
        />

        <BenefitModal 
          isOpen={isBenefitModalOpen} 
          onClose={() => setIsBenefitModalOpen(false)} 
        />
        
        <InsurerDetailModal 
          isOpen={isInsurerModalOpen} 
          onClose={() => setIsInsurerModalOpen(false)} 
          insurerId={viewedInsurerId}
        />
      </div>
    </div>
  );
}
