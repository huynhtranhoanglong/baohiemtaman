import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import BackButton from '@/components/ui/BackButton';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-10 font-sans flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-xl">
        <Header />
        
        <main className="flex-grow px-5 py-6">
          <BackButton />
          
          <h1 className="text-[20px] font-bold text-[#1a1a1a] mb-5">Điều khoản sử dụng dịch vụ</h1>
          
          <div className="text-[14px] text-[#4b5563] space-y-4 leading-relaxed">
            <p>
              Chào mừng quý khách truy cập hệ thống <strong>baohiemtaman.com</strong>.
              Việc bạn tiếp tục điền đơn và sử dụng nền tảng của chúng tôi đồng nghĩa với việc bạn xác nhận đã đọc
              và đồng ý với các Điều khoản & Điều kiện được nêu rõ dưới đây.
            </p>
            
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">1. Phân định trách nhiệm và Giao dịch</h2>
            <p>
              <strong>Bảo hiểm Tâm An không trực tiếp thu tiền của quý khách dưới mọi hình thức.</strong> 
              Tâm An hoạt động vận hành cung cấp nền tảng truyền dẫn dữ liệu, thông tin như một đại lý môi giới bảo hiểm chính thức.
              Mọi giao dịch thanh toán cuối cùng sẽ được thực hiện tại một Cổng thanh toán chính thức nằm trên hệ thống của đối tác phân phối <strong>Global Care</strong>. 
            </p>
            <p>Khách hàng có trách nhiệm thực hiện chuyển tiền chuẩn xác nội dung báo trên cổng tự động hoặc cấu trúc có tại Email thanh toán. Mọi phát sinh trục trặc sẽ được hãng bảo hiểm tiếp nhận dựa trên sao kê tài khoản nhận chính thức của Global Care.</p>
            
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">2. Giao nhận Giấy chứng nhận Điện tử</h2>
            <p>
              Sau khi có tín hiệu thanh toán thành công, Giấy chứng nhận bảo hiểm điện tử (Bản PDF mã tra cứu hợp lệ, theo tiêu chuẩn pháp luật do Bộ Tài Chính quy định) sẽ được Đại lý quản trị tải thông báo và gửi thủ công trực tiếp qua một trong hai phương thức: Email hoặc Zalo của quý khách cung cấp tại form.
            </p>

            <h2 className="text-[16px] font-bold text-[#1a1a1a] mt-6">3. Chính sách Hoàn / Hủy (Strict Refund Policy)</h2>
            <p>
              Đối với dòng sản phẩm <strong>Bảo hiểm Bắt buộc TNDS của chủ xe mô tô, xe máy</strong>, do tính chất đồng bộ tự động lên cơ sở dữ liệu và yêu cầu ràng buộc pháp lý từ Nghị định Chính phủ, 
              <strong>chúng tôi KHÔNG hỗ trợ hoàn tiền hoặc hủy đơn dưới mọi hình thức</strong> sau khi hệ thống đã hoàn tất thanh toán và Giấy chứng nhận được phát hành.
            </p>
            <p>
              Nếu quý khách có bất kỳ sai sót nào trong quá trình điền thông tin tham gia nhận diện của xe (Sai số biển số, sai số khung, sai số máy tự sinh), vui lòng liên hệ ngay với <strong>Hotline/Zalo CSKH</strong> của Tâm An. Chúng tôi sẽ hỗ trợ lập tức báo với trung tâm vận hành phía Global Care để kiểm tra, đính chính phụ lục hoặc ra sửa đổi thông báo (Addendum) khắc phục nếu DBV Insurance cho phép trên quy định nền tảng.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
