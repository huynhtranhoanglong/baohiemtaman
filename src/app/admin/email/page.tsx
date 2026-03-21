'use client';

import { useState, useEffect } from 'react';
import { Mail, Settings, Send, Eye } from 'lucide-react';

export default function AdminEmailPage() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  // Template State (Saved to localStorage)
  const [headerImg, setHeaderImg] = useState('');
  const [footerImg, setFooterImg] = useState('');
  const [greeting, setGreeting] = useState('Kính gửi Quý khách hàng {name},');
  const [instructions, setInstructions] = useState('Cảm ơn Quý khách đã tin tưởng và mua sản phẩm bảo hiểm thông qua hệ thống phân phối của Tâm An (đối tác Global Care). Quý khách đã chọn phương thức thanh toán chuyển khoản, vui lòng thực hiện chuyển khoản bằng cách quét mã QR Code dưới đây.');
  
  // Dynamic Customer Data
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [plate, setPlate] = useState('');
  
  // Bank Transfer Data
  const [accountNumber, setAccountNumber] = useState('902009661565');
  const [amount, setAmount] = useState('');
  const [transferContent, setTransferContent] = useState('');
  
  // Status
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Load template from local storage on mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('taman_email_template');
    if (savedTemplate) {
      try {
        const parsed = JSON.parse(savedTemplate);
        if (parsed.headerImg) setHeaderImg(parsed.headerImg);
        if (parsed.footerImg) setFooterImg(parsed.footerImg);
        if (parsed.greeting) setGreeting(parsed.greeting);
        if (parsed.instructions) setInstructions(parsed.instructions);
      } catch (e) {
        console.error("No valid template settings found.");
      }
    }
  }, []);

  const saveTemplateSettings = () => {
    const settings = { headerImg, footerImg, greeting, instructions };
    localStorage.setItem('taman_email_template', JSON.stringify(settings));
    alert('Đã lưu cấu hình Template (Banner & Lời chào) vào trình duyệt thành công!');
  };

  const getRenderedHtml = () => {
    const finalGreeting = greeting.replace('{name}', customerName ? `<strong>${customerName}</strong>` : '[Tên khách hàng]');
    const formattedAmount = amount ? Number(amount).toLocaleString('vi-VN') : '...';
    
    // Using vietqr.io Open API
    const qrUrl = accountNumber && amount && transferContent 
      ? `https://img.vietqr.io/image/woori-${accountNumber}-compact2.png?amount=${amount}&addInfo=${transferContent}&accountName=GC%20CTY%20CP%20TV%20GLOBAL%20CARE`
      : '';

    return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f5f7; color: #1a1a1a; margin: 0; padding: 20px; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
          .header-img { width: 100%; display: block; }
          .content { padding: 30px; }
          .title { color: #0253af; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
          .qr-section { text-align: center; margin: 30px 0; }
          .qr-image { max-width: 280px; border: 1px solid #ddd; border-radius: 12px; padding: 10px; background: #fff; }
          
          .info-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .info-box h3 { margin-top: 0; color: #333; font-size: 16px; margin-bottom: 15px; }
          .info-box ul { list-style: none; padding: 0; margin: 0; }
          .info-box li { margin-bottom: 10px; font-size: 15px; }
          .highlight-code { font-family: monospace; font-size: 18px; font-weight: bold; padding: 4px 8px; background: #f1f5f9; border-radius: 4px; letter-spacing: 1px; }
          
          .warning-box { color: #e11d48; font-size: 14px; font-style: italic; margin-top: 15px; }
          .footer-img { width: 100%; display: block; border-top: 1px solid #eeeeee; }
          .footer-text { text-align: center; font-size: 13px; color: #6b7280; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          ${headerImg ? `<img src="${headerImg}" alt="Header Banner" class="header-img" />` : '<div style="background:#0253af; height: 10px; width: 100%;"></div>'}
          
          <div class="content">
            <div class="title">${finalGreeting}</div>
            <p>${instructions}</p>
            
            ${amount && transferContent ? `
            <div class="qr-section">
              <img src="${qrUrl}" alt="VietQR" class="qr-image" />
            </div>
            ` : `
            <div class="qr-section" style="background:#f1f5f9; height:280px; display:flex; align-items:center; justify-content:center; border:2px dashed #ccc; border-radius:12px; color:#94a3b8;">
              Mã VietQR sẽ tự động hiện ở đây
            </div>
            `}
            
            <div class="info-box">
              <h3>Hoặc thực hiện chuyển khoản bằng cách nhập theo thông tin sau:</h3>
              <ul>
                <li>Tên tài khoản: <strong>GC CTY CP TV GLOBAL CARE</strong></li>
                <li>Số tài khoản: <strong>${accountNumber || '...'}</strong></li>
                <li>Số tiền thanh toán: <strong>${formattedAmount} đồng</strong></li>
                <li>Nội dung chuyển khoản (Vui lòng ghi đúng): <br/><br/><span class="highlight-code">${transferContent || '...'}</span></li>
              </ul>
              <div class="warning-box">
                * Lưu ý: Thông tin chuyển khoản sẽ hết hiệu lực sau 0h hàng ngày, vui lòng thực hiện thanh toán trước thời gian này để tránh các vấn đề phát sinh.
              </div>
            </div>
            
            <h4>Hướng dẫn Thanh toán Internet Banking</h4>
            <ol style="font-size: 14px; color: #444;">
              <li>Mở ứng dụng chuyển khoản ngân hàng của bạn.</li>
              <li>Quét mã QR hoặc nhập chính xác thông tin chuyển khoản bên trên.</li>
              <li>Sau khi thanh toán thành công, ấn "Xác nhận đã chuyển khoản" trên ứng dụng của bạn.</li>
            </ol>
            
            <p style="margin-top: 30px; font-size: 14px;">Trong quá trình thực hiện nếu Quý khách gặp vấn đề liên quan đến giao dịch hoặc không nhận được giấy chứng nhận bảo hiểm sau khi thanh toán, vui lòng liên hệ trực tiếp với chúng tôi để được hỗ trợ nhanh nhất:</p>
            <div style="margin-top: 10px; font-size: 14px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <div>💬 <strong>Zalo CSKH:</strong> <a href="https://zalo.me/0909999999" style="display: inline-block; margin-left: 5px; background-color: #0068ff; color: #ffffff; padding: 5px 12px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">Nhắn tin qua Zalo</a></div>
            </div>
            <p style="font-style: italic; color: #555;">Trân trọng cảm ơn Quý khách và mến chúc Quý khách sức khỏe, thành công.</p>
          </div>
          
          ${footerImg ? `<img src="${footerImg}" alt="Footer Banner" class="footer-img" />` : ''}
          <div class="footer-text">
            Đây là email tự động. Vui lòng không chia sẻ mã QR này cho bất kỳ ai khác.
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleSendEmail = async () => {
    if (!customerEmail || !customerName || !amount || !transferContent || !accountNumber) {
      alert("Vui lòng điền đủ Tên, Email khách, Số tài khoản, Số tiền và Nội dung chuyển khoản!");
      return;
    }

    setIsSending(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: customerEmail,
          customerName: customerName,
          templateHtml: getRenderedHtml()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Gửi thư báo thành công!');
        // Keep name, clear the rest for next use
        setCustomerEmail('');
        setAmount('');
        setTransferContent('');
        setPlate('');
      } else {
        setStatusMessage(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      setStatusMessage('Lỗi hệ thống khi gọi API Gửi email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Mail className="text-primary" /> Công cụ Gửi Email (Chế độ VietQR)
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* L E F T  P A N E L :  C O N T R O L S */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === 'editor' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Send size={16} /> Thông tin Khách hàng
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 lg:hidden ${activeTab === 'preview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Eye size={16} /> Xem trước
            </button>
          </div>

          <div className={`p-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            {/* Template Settings Block */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Settings size={18} /> Cấu hình Template (Lưu tự động)
                </h3>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">URL Ảnh Header Banner (Cân đối tỷ lệ 16:9 hoặc siêu rộng)</label>
                  <input type="text" value={headerImg} onChange={e => setHeaderImg(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Lời chào mẫu (Dùng <code className="bg-gray-200 px-1 rounded">{'{name}'}</code> để gọi tên)</label>
                  <input type="text" value={greeting} onChange={e => setGreeting(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Đoạn mô tả đầu thư</label>
                  <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">URL Ảnh Footer Banner (Tùy chọn)</label>
                  <input type="text" value={footerImg} onChange={e => setFooterImg(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border rounded-md" />
                </div>
                <button onClick={saveTemplateSettings} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-xs font-semibold">Lưu Cấu hình (Browser Cache)</button>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            {/* Customer Data Block */}
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">Tạo Email Mới</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng *</label>
                  <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Phạm Thị Hồng" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email gửi đến *</label>
                  <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="khachhang@gmail.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biển Số Xe / Số khung (Bỏ trống cũng được)</label>
                <input type="text" value={plate} onChange={e => setPlate(e.target.value)} placeholder="Ví dụ: 59X1-12345" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none uppercase" />
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <div className="col-span-2 text-sm font-semibold text-orange-800 mb-1">Thông tin thanh toán Global Care:</div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số tài khoản nhận tiền (Woori Bank) *</label>
                  <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-bold text-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền (VNĐ) *</label>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="86000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-bold text-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chuyển khoản *</label>
                  <input type="text" value={transferContent} onChange={e => setTransferContent(e.target.value)} placeholder="trantcjvp37526" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-bold text-primary" required />
                </div>
              </div>

              {statusMessage && (
                <div className={`p-4 rounded-lg text-sm font-medium ${statusMessage.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {statusMessage}
                </div>
              )}

              <button 
                onClick={handleSendEmail}
                disabled={isSending}
                className={`w-full py-4 mt-6 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-md transition flex items-center justify-center gap-2 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSending ? 'Đang gửi qua Hệ thống...' : <><Send size={18} /> GỬI EMAIL THÔNG BÁO</>}
              </button>
            </div>
          </div>
        </div>

        {/* R I G H T  P A N E L :  L I V E  P R E V I E W */}
        <div className={`lg:block ${activeTab === 'editor' ? 'hidden' : 'block'}`}>
          <div className="sticky top-8">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Eye size={18} /> Live Preview (Tỉ lệ thật 100%)</h3>
            <div className="bg-gray-100 p-4 rounded-xl border-2 border-dashed border-gray-300 max-h-[800px] overflow-y-auto">
              <div 
                dangerouslySetInnerHTML={{ __html: getRenderedHtml() }} 
                className="pointer-events-none"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Đây là kết xuất HTML giả lập dựa theo nội dung của Global Care.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
