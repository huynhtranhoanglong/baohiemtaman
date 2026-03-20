'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { trackEvent } from '@/utils/tracking';
import Header from '@/components/ui/Header';
import ProgressBar from '@/components/ui/ProgressBar';
import HeroBanner from '@/components/insurance/HeroBanner';
import DurationCard from '@/components/insurance/DurationCard';
import VehicleTypeSelector from '@/components/insurance/VehicleTypeSelector';
import FloatingInput from '@/components/insurance/FloatingInput';
import ProviderInfo from '@/components/insurance/ProviderInfo';
import ConfirmSummary from '@/components/insurance/ConfirmSummary';
import SuccessCard from '@/components/insurance/SuccessCard';
import OcrUploader from '@/components/insurance/OcrUploader';
import StickyFooter from '@/components/ui/StickyFooter';
import Footer from '@/components/ui/Footer';
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
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  
  const [isInsurerModalOpen, setIsInsurerModalOpen] = useState(false);
  const [viewedInsurerId, setViewedInsurerId] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [showOcrOptions, setShowOcrOptions] = useState(false);
  const today = TODAY;

  useEffect(() => {
    if (currentStep !== 1) {
      setShowStickyFooter(true);
      return;
    }

    const handleScroll = () => {
      const buyBtn = document.getElementById('hero-buy-now-btn');
      if (buyBtn) {
        const rect = buyBtn.getBoundingClientRect();
        // Visible when the button is scrolled out of view (bottom is less than 0, or header height like 60px)
        setShowStickyFooter(rect.bottom < 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  const [formData, setFormData] = useState({
    ...DEFAULT_FORM_DATA,
    startDate: today,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from sessionStorage (for returning from aux pages)
  useEffect(() => {
    const savedForm = sessionStorage.getItem('insurance_form_data');
    if (savedForm) {
      try { setFormData(JSON.parse(savedForm)); } catch(e){}
    }
    const savedStep = sessionStorage.getItem('insurance_current_step');
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
    setIsHydrated(true);
  }, []);

  // Persist state to sessionStorage
  useEffect(() => {
    if (isHydrated) {
      sessionStorage.setItem('insurance_form_data', JSON.stringify(formData));
    }
  }, [formData, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      sessionStorage.setItem('insurance_current_step', currentStep.toString());
    }
  }, [currentStep, isHydrated]);

  useEffect(() => {
    if (currentStep === 1) trackEvent('view_landing_page');
    else if (currentStep === 2) trackEvent('view_summary');
    else if (currentStep === 3) trackEvent('view_success');
  }, [currentStep]);

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
    trackEvent('buy_another');
    const end = new Date(today);
    end.setFullYear(end.getFullYear() + 1);
    
    sessionStorage.removeItem('insurance_form_data');
    sessionStorage.removeItem('insurance_current_step');

    setFormData({
      ...DEFAULT_FORM_DATA,
      startDate: today,
      endDate: end.toISOString().split('T')[0],
    });
    setOrderId(null);
    setCurrentStep(1);
  }, [today]);

  // Stable callback cho StickyFooter — không tạo lại mỗi render
  const handleAction = useCallback(async () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        trackEvent('begin_checkout', { value: totalPrice, currency: 'VND', items: [{ item_name: 'Bảo hiểm xe máy', item_category: formData.vehicleType }] });
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

        let finalOrderId = null;
        if (!res.ok) {
          console.error("Lỗi khi gửi API", await res.text());
          alert('Lỗi gửi API Sheets (thiếu .env), nhưng vẫn chuyển thử trang Thành Công!');
        } else {
          const resData = await res.json();
          if (resData.orderId) {
            finalOrderId = resData.orderId;
            setOrderId(finalOrderId);
          }
        }
        
        trackEvent('purchase', { 
          transaction_id: finalOrderId, // Data layer for Order ID
          value: totalPrice, 
          currency: 'VND', 
          items: [{ item_name: 'Bảo hiểm xe máy', item_category: formData.vehicleType }] 
        });
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
                onBuyNow={() => {
                  document.getElementById('duration-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
              
              <div id="duration-section" className="scroll-mt-4">
                <DurationCard 
                  duration={formData.duration}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  onChangeDuration={(val) => updateField('duration', val as any)}
                  onChangeStartDate={(val) => updateField('startDate', val)}
                  setEndDate={(val) => updateField('endDate', val)}
                />
              </div>
          
          {/* Card Nhập Form Chính */}
          <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4">
            {!isManualInput ? (
              <div className="bg-blue-50/40 border border-[#0253af]/20 rounded-[12px] p-5 flex flex-col items-center gap-4">
                <div className="relative p-2.5 flex items-center justify-center">
                  {/* 4 góc vuông tạo hiệu ứng "Công nghệ quét" */}
                  <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-[2.5px] border-l-[2.5px] border-[#0253af] rounded-tl-[2px]" />
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-[2.5px] border-r-[2.5px] border-[#0253af] rounded-tr-[2px]" />
                  <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-[2.5px] border-l-[2.5px] border-[#0253af] rounded-bl-[2px]" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-[2.5px] border-r-[2.5px] border-[#0253af] rounded-br-[2px]" />
                  
                  <img src="/assets/ca-vet.webp" alt="Minh hoạ cavet" className="h-[40px] object-contain drop-shadow-md opacity-90" />
                </div>
                <p className="text-[#1a1a1a] text-[15px] font-medium text-center px-2">
                  Điền thông tin tự động từ giấy đăng ký xe
                </p>
                
                {!showOcrOptions ? (
                  <div className="flex w-full gap-3 mt-1">
                    <button 
                      type="button"
                      onClick={() => setIsManualInput(true)} 
                      className="flex-1 py-3 px-1 rounded-xl border-[1.5px] border-[#0253af] text-[#0253af] font-bold text-[14.5px] bg-white transition-colors"
                    >
                      Nhập thủ công
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowOcrOptions(true)} 
                      className="flex-1 py-3 px-1 rounded-xl bg-[#0253af] text-white font-bold text-[14.5px] shadow-sm transition-colors"
                    >
                      Nhập tự động
                    </button>
                  </div>
                ) : (
                  <div className="w-full mt-1 animate-slide-up">
                    <OcrUploader onOcrSuccess={(data) => {
                       trackEvent('ocr_success');
                       setFormData(prev => ({
                         ...prev,
                         ownerName: data.ownerName || prev.ownerName,
                         licensePlate: data.licensePlate || prev.licensePlate,
                         chassisNumber: data.chassisNumber || prev.chassisNumber,
                         engineNumber: data.engineNumber || prev.engineNumber,
                         address: data.address || prev.address,
                         vehicleType: data.vehicleType || prev.vehicleType
                       }));
                       setErrors({});
                       setIsManualInput(true);
                    }} />
                    <button 
                      type="button"
                      onClick={() => setIsManualInput(true)}
                      className="mt-3 w-full py-3 px-1 rounded-xl border-[1.5px] border-[#0253af] text-[#0253af] font-bold text-[14.5px] bg-white transition-colors"
                    >
                      Nhập thủ công
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-[#1a1a1a] text-[16px]">Thông tin xe</h3>
                  <button 
                    type="button"
                    onClick={() => { setIsManualInput(false); setShowOcrOptions(true); }}
                    className="text-[#0253af] text-[13px] font-bold hover:underline"
                  >
                    Quét cavet tự động
                  </button>
                </div>
            
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
            </>
            )}
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
              orderId={orderId}
              onBuyAnother={handleBuyAnother}
              onGoHome={handleBuyAnother}
            />
          )}

        </main>

        <Footer />

        {/* Sticky footer bị giấu ở trang 3 */}
        {!isStep3 && (
          <StickyFooter 
            totalPrice={totalPrice} 
            buttonLabel={isSubmitting ? "Đang xử lý..." : (currentStep === 1 ? "Tiếp tục" : "Thanh toán")} 
            onAction={handleAction} 
            isVisible={showStickyFooter}
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
