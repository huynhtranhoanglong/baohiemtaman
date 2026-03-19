import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-10 font-sans flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-xl">
        <Header />
        
        <main className="flex-grow px-5 py-6">
          <Link href="/" className="inline-flex items-center text-[#0253af] text-[14px] font-medium mb-5 hover:underline transition-colors outline-none cursor-pointer">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Trở về hệ thống tạo đơn
          </Link>
          
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-5">Chính sách bảo mật dữ liệu</h1>
          
          <div className="text-[14px] text-[#4b5563] space-y-4 leading-relaxed">
            <p>
              Sự riêng tư và an toàn thông tin của quý khách là ưu tiên hàng đầu của Bảo hiểm Tâm An.
              Chính sách bảo mật này giải thích rõ ràng về cách hệ thống thu thập, sử dụng và bảo vệ thông tin
              cá nhân khi quý khách truy cập và tương tác tại <strong>baohiemtaman.com</strong>.
            </p>
            
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">1. Mục đích thu thập dữ liệu</h2>
            <p>Chúng tôi chỉ thu thập thông tin cá nhân cơ bản (Bao gồm: Họ tên, Số điện thoại, Email, Địa chỉ, Số khung, Số máy, Biển số xe, hoặc hình ảnh upload thuật toán OCR) nhằm phục vụ các mục đích cụ thể sau:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Xác thực, tạo lập hồ sơ và cấp giấy chứng nhận bảo hiểm trên hệ thống của đối tác (Global Care và DBV Insurance).</li>
              <li>Trao đổi và hướng dẫn quy trình thanh toán, giải đáp thắc mắc thông qua Email / Zalo trong quá trình xử lý đơn hàng.</li>
              <li>Lưu lại điểm dữ liệu để hệ thống và Đại lý gửi nhắc nhở, thông báo khi bảo hiểm của xe chuẩn bị hết hạn vào các kỳ tiếp theo.</li>
            </ul>

            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">2. Cam kết không trục lợi, chia sẻ thông tin</h2>
            <p>
              Hệ thống xử lý thông tin tại Tâm An cam kết chỉ lưu chuyển nội bộ quy trình và truyền tải trực tiếp một cách bảo mật sang đối tác Global Care và hãng bảo hiểm phục vụ mục đích xuất đơn.
              Đại lý <strong>cam kết tuyệt đối không bán, trao đổi, hay chia sẻ thông tin cá nhân của quý khách cho bất kỳ bên thứ ba (Third-party) nào khác</strong> cho mục đích quảng cáo hoặc lợi nhuận trái phép.
            </p>

            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">3. Quyền lợi và kiểm soát dữ liệu của người dùng</h2>
            <p>
              Dữ liệu của khách hàng sẽ được chúng tôi lưu trữ an toàn trong suốt vòng đời hiệu lực của hợp đồng bảo hiểm hoặc cho đến khi khách hàng có yêu cầu ngừng lưu trữ.
              Bất kỳ lúc nào, bạn cũng có quyền yêu cầu cập nhật, sửa đổi hoặc xóa hoàn toàn dữ liệu bản thân khỏi danh sách nhắc nhở và quản trị của Tâm An bằng cách liên hệ qua Zalo CSKH (+84777575987) hoặc Email công bố tại website.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
