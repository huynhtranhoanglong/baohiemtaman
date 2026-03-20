import React from 'react';
import Image from 'next/image';
import { Shield, ChevronRight, ScanLine, Zap, ShieldCheck } from 'lucide-react';
import { BENEFITS, PRICING, SOCIAL_PROOF, HERO_COMMITMENTS } from '@/constants';

interface HeroBannerProps {
  onOpenBenefit: () => void;
  isVoluntaryIncluded: boolean;
  onToggleVoluntary: (val: boolean) => void;
  onBuyNow?: () => void;
}

export default function HeroBanner({ onOpenBenefit, isVoluntaryIncluded, onToggleVoluntary, onBuyNow }: HeroBannerProps) {
  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 w-full">
      {/* Hero Image Banner */}
      <div className="w-full rounded-[10px] overflow-hidden mb-4 relative flex items-center justify-center bg-[#f4f5f7]">
        <Image 
          src="/assets/main-banner.webp" 
          alt="Tam An Insurance Banner" 
          width={1200}
          height={600}
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      <button 
        onClick={onOpenBenefit}
        className="w-full flex justify-between items-center mb-4 cursor-pointer outline-none"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" fill="currentColor" fillOpacity={0.1} />
          <span className="font-bold text-[16px] text-[#1a1a1a]">Quyền lợi chi trả</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>



      <div className="space-y-3">
        <div className="flex justify-between text-[14px]">
          <span className="text-[#4b5563]">Nạn nhân</span>
          <span className="font-semibold text-[#1a1a1a]">{BENEFITS.VICTIM_PERSON}</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#4b5563]">Tài sản nạn nhân</span>
          <span className="font-semibold text-[#1a1a1a]">{BENEFITS.VICTIM_PROPERTY}</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#4b5563]">Chủ xe</span>
          {isVoluntaryIncluded ? (
            <span className="font-semibold text-primary">{BENEFITS.OWNER_PERSON_DETAIL}</span>
          ) : (
            <span className="font-semibold text-gray-400">Không bao gồm</span>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mt-4 mb-3"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-bold text-[#1a1a1a] text-[15px]">Bảo hiểm xe máy tự nguyện</h3>
          <span className="text-[14px] text-[#0253af] font-semibold mt-0.5">{PRICING.VOLUNTARY_PER_YEAR.toLocaleString('vi-VN')}đ/năm</span>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isVoluntaryIncluded}
            onChange={(e) => onToggleVoluntary(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0253af]"></div>
        </label>
      </div>
      {/* Social Proof UI */}
      <div className="flex items-center justify-center gap-1.5 mt-5 bg-green-50 border border-green-200 p-1.5 rounded-full w-fit mx-auto max-w-full">
        <div className="flex -space-x-2 pl-1 shrink-0">
          {SOCIAL_PROOF.avatars.map((avatar, idx) => (
            <Image 
              key={idx}
              src={avatar} 
              alt={`Customer ${idx + 1}`} 
              width={22} 
              height={22} 
              className="rounded-full border border-white w-[22px] h-[22px] object-cover shrink-0"
            />
          ))}
        </div>
        <span className="text-[10px] sm:text-[11px] text-green-700 font-semibold pr-2 truncate">{SOCIAL_PROOF.text}</span>
      </div>

      {/* Commitments Section */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-3">
        {HERO_COMMITMENTS.map((item, idx) => {
          const Icon = [ScanLine, Zap, ShieldCheck][idx];
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f4f5f7] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#1a1a1a]">{item.title}</span>
                <span className="text-[13px] text-[#4b5563] mt-0.5">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <button 
        id="hero-buy-now-btn"
        onClick={onBuyNow}
        className="mt-6 w-full bg-[#0253af] hover:bg-[#01428c] active:bg-[#013570] text-white font-bold py-3.5 px-4 rounded-[10px] shadow-[0_4px_14px_0_rgba(2,83,175,0.39)] transition-all flex items-center justify-center gap-2"
      >
        <span className="text-[16px]">Mua ngay</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
