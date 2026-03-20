'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import BackButton from '@/components/ui/BackButton';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Mặc định không mở câu nào

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-10 font-sans flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-xl">
          <Header />
          
          <main className="flex-grow px-5 py-6">
            <BackButton />
            
            <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-5">Câu hỏi thường gặp (FAQ)</h1>
            
            <div className="space-y-3">
              {FAQ_ITEMS.map((item: { question: string; answer: string }, idx: number) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className={`border rounded-[10px] overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#0253af] shadow-sm' : 'border-gray-200'}`}
                  >
                    <button
                      onClick={() => toggleOpen(idx)}
                      className={`w-full text-left px-4 py-3.5 flex justify-between items-center transition-colors ${isOpen ? 'bg-[#f8fbff]' : 'bg-white hover:bg-gray-50'}`}
                    >
                      <span className={`text-[14.5px] font-bold leading-snug pr-4 ${isOpen ? 'text-[#0253af]' : 'text-[#374151]'}`}>
                        {item.question}
                      </span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0253af]' : ''}`} />
                    </button>
                    
                    <div 
                      className={`px-4 text-[13.5px] text-[#4b5563] leading-relaxed transition-all duration-300 origin-top overflow-hidden ${isOpen ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
                    >
                      {item.answer.split('\n').map((paragraph: string, pIdx: number) => (
                        <p key={pIdx} className="mb-2.5 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
              <p className="text-[14px] text-center text-[#6b7280] mb-2">
                Bạn vẫn còn câu hỏi khác?
              </p>
              <a 
                href="https://zalo.me/84777575987" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#0253af]/10 text-[#0253af] px-5 py-2 rounded-full text-[13.5px] font-bold hover:bg-[#0253af]/20 transition-colors"
              >
                Liên hệ hỗ trợ qua Zalo
              </a>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
  );
}
