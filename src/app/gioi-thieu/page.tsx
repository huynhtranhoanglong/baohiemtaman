import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-10 font-sans flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-xl">
        <Header />
        
        <main className="flex-grow px-5 py-6">
          <Link href="/" className="inline-flex items-center text-[#0253af] text-[14px] font-medium mb-5 hover:underline transition-colors outline-none cursor-pointer">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Trở về hệ thống hiện tại
          </Link>
          
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-5">Giới thiệu & Liên hệ</h1>
          
          <div className="text-[14px] text-[#4b5563] space-y-4 leading-relaxed">
            <p>
              <strong>Bảo hiểm Tâm An</strong> là nền tảng phân phối dịch vụ bảo hiểm điện tử trực thuộc quyền quản lý của <strong>Đại lý bảo hiểm cá nhân Nguyễn Tài Nhân</strong>.
            </p>
            
            <p>
              Chúng tôi tự hào là đối tác phân phối chính thức của nền tảng vận hành <strong>Global Care</strong>, mang đến cho người dùng trải nghiệm mua các sản phẩm bảo hiểm từ <strong>DBV Insurance</strong> (Tổng Công ty Cổ phần Bảo hiểm Hàng không - được hỗ trợ tài chính từ tập đoàn DB Insurance Hàn Quốc).
            </p>

            <div className="bg-[#f4f5f7] p-4 rounded-lg border border-gray-100 my-6">
              <h2 className="text-[15px] font-bold text-[#1a1a1a] mb-2">Tuyên bố miễn trừ trách nhiệm (Disclaimer)</h2>
              <p className="text-[13px] text-[#6b7280] italic leading-relaxed">
                Bảo hiểm Tâm An không phải là doanh nghiệp hoạt động kinh doanh/bảo lãnh bồi thường bảo hiểm. Mọi chứng nhận đều do hãng bảo hiểm DBV Insurance phát hành, chịu trách nhiệm pháp lý cao nhất và bồi thường theo đúng các thỏa thuận tại từng loại hình của pháp luật.
              </p>
            </div>

            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">Thông tin liên hệ Đại lý</h2>
            <ul className="space-y-2.5 mt-2">
              <li><strong className="text-[#374151]">Đại diện pháp lý:</strong> Nguyễn Tài Nhân</li>
              <li><strong className="text-[#374151]">Địa chỉ thực tế:</strong> 128/18 Hùng Vương, phường Vườn Lài, TPHCM</li>
              <li><strong className="text-[#374151]">Hotline / Zalo:</strong> <a href="https://zalo.me/84777575987" target="_blank" rel="noopener noreferrer" className="text-[#0253af] hover:underline">+84777575987</a></li>
              <li><strong className="text-[#374151]">Email:</strong> <a href="mailto:baohiemtaman68@gmail.com" className="text-[#0253af] hover:underline">baohiemtaman68@gmail.com</a></li>
            </ul>

            <p className="mt-6 pb-4">
              Mọi thắc mắc trong quá trình kiểm tra giá trị hiệu lực của giấy chứng nhận hoặc nhu cầu bồi thường thiệt hại thực tế, quý khách vui lòng liên lạc với chúng tôi qua Zalo hoặc Email.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
