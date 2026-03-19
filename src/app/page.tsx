'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import ProgressBar from '@/components/ui/ProgressBar';
import HeroBanner from '@/components/insurance/HeroBanner';
import DurationCard from '@/components/insurance/DurationCard';
import VehicleTypeSelector from '@/components/insurance/VehicleTypeSelector';
import FloatingInput from '@/components/insurance/FloatingInput';
import ProviderInfo from '@/components/insurance/ProviderInfo';
import ConfirmSummary from '@/components/insurance/ConfirmSummary';
import SuccessCard from '@/components/insurance/SuccessCard';
import StickyFooter from '@/components/ui/StickyFooter';
import {
  PRICING, VEHICLE_TYPE_IDS, PROVIDER_IDS,
  DEFAULT_FORM_DATA, EMAIL_REGEX, PHONE_REGEX,
  VALIDATION_MESSAGES, API,
} from '@/constants';

// Lazy load modals — chỉ tải code khi user thực sự mở modal
const CertInfoModal = dynamic(() => import('@/components/modals/CertInfoModal'), { ssr: false });
const GuideModal = dynamic(() => import('@/components/modals/GuideModal'), { ssr: false });
const BenefitModal = dynamic(() => import('@/components/modals/BenefitModal'), { ssr: false });
const InsurerDetailModal = dynamic(() => import('@/components/modals/InsurerDetailModal'), { ssr: false });

const TODAY = new Date().toISOString().split('T')[0];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  
  const [isInsurerModalOpen, setIsInsurerModalOpen] = useState(false);
  const [viewedInsurerId, setViewedInsurerId] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = TODAY;

  const [formData, setFormData] = useState({
    ...DEFAULT_FORM_DATA,
    startDate: today,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const { ownerName, address, licensePlate, engineNumber, chassisNumber, email, phone } = formData;

    if (!ownerName.trim()) newErrors.ownerName = VALIDATION_MESSAGES.ownerName;
    if (!address.trim()) newErrors.address = VALIDATION_MESSAGES.address;
    if (!licensePlate.trim()) newErrors.licensePlate = VALIDATION_MESSAGES.licensePlate;
    if (!engineNumber.trim()) newErrors.engineNumber = VALIDATION_MESSAGES.engineNumber;
    if (!chassisNumber.trim()) newErrors.chassisNumber = VALIDATION_MESSAGES.chassisNumber;
    
    if (!email.trim() || !EMAIL_REGEX.test(email)) {
      newErrors.email = VALIDATION_MESSAGES.email;
    }

    if (!phone.trim() || !PHONE_REGEX.test(phone)) {
      newErrors.phone = VALIDATION_MESSAGES.phone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Memoize giá — chỉ tính lại khi vehicleType, duration hoặc isVoluntaryIncluded thay đổi
  const totalPrice = useMemo(() => {
    let basePrice = formData.vehicleType === VEHICLE_TYPE_IDS.ABOVE_50CC
      ? PRICING.MANDATORY_ABOVE_50CC
      : PRICING.MANDATORY_BELOW_50CC;
    if (formData.isVoluntaryIncluded) basePrice += PRICING.VOLUNTARY_PER_YEAR;
    return basePrice * formData.duration;
  }, [formData.vehicleType, formData.isVoluntaryIncluded, formData.duration]);

  const updateField = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Hàm Reset Mua Xe Khác
  const handleBuyAnother = useCallback(() => {
    const end = new Date(today);
    end.setFullYear(end.getFullYear() + 1);
    setFormData({
      ...DEFAULT_FORM_DATA,
      startDate: today,
      endDate: end.toISOString().split('T')[0],
    });
    setCurrentStep(1);
  }, [today]);

  // Stable callback cho StickyFooter — không tạo lại mỗi render
  const handleAction = useCallback(async () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === 2) {
      if (isSubmitting) return;

      setIsSubmitting(true);
      try {
        const payload = {
          ...formData,
          totalPrice,
          createdAt: new Date().toISOString(),
        };

        const res = await fetch(API.SUBMIT_ORDER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          console.error("Lỗi khi gửi API", await res.text());
          alert('Lỗi gửi API Sheets (thiếu .env), nhưng vẫn chuyển thử trang Thành Công!');
        }
        
        setCurrentStep(3);
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Lỗi mạng nội bộ.');
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [currentStep, isSubmitting, formData, totalPrice, validateStep1]);

  // Bước 3: Hoàn tất thì giấu bớt phần tử thừa đổi Background
  const isStep3 = currentStep === 3;

  return (
    <div className={`min-h-screen ${isStep3 ? 'bg-[#f4f5f7]' : 'bg-[#fff]'} pb-32 font-sans flex justify-center`}>
      <div className={`w-full max-w-md ${isStep3 ? '' : 'bg-[#f4f5f7]'} min-h-screen relative flex flex-col shadow-xl`}>
        
        {/* Header và Progress luôn hiện */}
        <Header />
        <ProgressBar currentStep={currentStep} />

        <main className={`flex-grow px-4 ${isStep3 ? 'pt-2' : 'space-y-4'}`}>
          
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
                  setViewedInsurerId(PROVIDER_IDS.DBV);
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
            totalPrice={totalPrice} 
            buttonLabel={isSubmitting ? "Đang xử lý..." : (currentStep === 1 ? "Tiếp tục" : "Thanh toán")} 
            onAction={handleAction} 
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
