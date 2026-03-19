import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle2, ImageIcon } from 'lucide-react';

interface OcrUploaderProps {
  onOcrSuccess: (data: {
    ownerName?: string;
    licensePlate?: string;
    engineNumber?: string;
    chassisNumber?: string;
    address?: string;
  }) => void;
}

export default function OcrUploader({ onOcrSuccess }: OcrUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: Kiểm tra size nếu cần
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh quá lớn (giới hạn 5MB).");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        try {
          const res = await fetch('/api/ocr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          const data = await res.json();
          
          if (res.ok && data.success && data.extracted) {
            onOcrSuccess(data.extracted);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
          } else {
             alert(data.error || 'Trí tuệ nhân tạo (AI) chưa thể đọc được thông tin từ ảnh này. Vui lòng chụp rõ nét hơn hoặc điền thủ công.');
          }
        } catch (apiError) {
          alert('Lỗi kết nối máy chủ OCR.');
        } finally {
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        alert("Lỗi khi đọc file ảnh từ điện thoại.");
        setLoading(false);
      }
    } catch (error) {
       console.error(error);
       setLoading(false);
    }
    
    // Reset file input để có thể chọn lại cùng 1 file
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  return (
    <div 
      className={`w-full border border-dashed rounded-[12px] p-4 flex flex-col items-center justify-center gap-3 transition-colors select-none
        ${success ? 'bg-green-50 border-green-300' : 'bg-[#f4f5f7] border-gray-300'}`}
    >
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" // Gọi trực tiếp camera sau trên Mobile (nếu hỗ trợ)
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={galleryInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      {loading ? (
        <div className="flex flex-col items-center animate-pulse duration-700">
          <Loader2 className="w-8 h-8 text-[#0253af] animate-spin mb-2" />
          <p className="text-[13px] text-[#4b5563] text-center font-bold">AI đang phân tích ảnh...</p>
          <p className="text-[12px] text-gray-500 text-center mt-1">Vui lòng đợi vài giây</p>
        </div>
      ) : success ? (
        <div className="flex flex-col items-center animate-slide-up">
          <CheckCircle2 className="w-9 h-9 text-green-500 mb-2" />
          <p className="text-[14px] text-green-600 font-extrabold text-center">Trích xuất thành công!</p>
          <p className="text-[12px] text-green-700/80 text-center mt-0.5">Các thông tin đã được tự động điền</p>
        </div>
      ) : (
        <>
          <div className="text-center mt-2 mb-1">
            <p className="text-[14px] font-bold text-[#1a1a1a]">Cung cấp Đăng ký xe (Cavet)</p>
          </div>
          
          <div className="flex gap-8 items-center bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            {/* Nút chụp ảnh (bật camera) */}
            <button 
              type="button"
              onClick={() => { if (!loading) fileInputRef.current?.click(); }}
              className="flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-blue-50/50 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-[#0253af]" />
              </div>
              <span className="text-[13px] font-medium text-[#1a1a1a]">Chụp ảnh</span>
            </button>

            <div className="w-[1px] h-10 bg-gray-200"></div>

            {/* Nút tải ảnh lên từ thư viện */}
            <button 
              type="button"
              onClick={() => { if (!loading) galleryInputRef.current?.click(); }}
              className="flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-blue-50/50 rounded-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-[#0253af]" />
              </div>
              <span className="text-[13px] font-medium text-[#1a1a1a]">Nhập từ máy</span>
            </button>
          </div>
          <div className="text-center mt-1">
            <p className="text-[12.5px] text-[#4b5563]">Hệ thống sẽ tự động bóc tách & điền giúp bạn</p>
          </div>
        </>
      )}
    </div>
  );
}
