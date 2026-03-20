import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle2, ImageIcon } from 'lucide-react';

interface OcrUploaderProps {
  onOcrSuccess: (data: {
    ownerName?: string;
    licensePlate?: string;
    engineNumber?: string;
    chassisNumber?: string;
    address?: string;
    vehicleType?: string;
  }) => void;
}

/**
 * Thu nhỏ ảnh trước khi gửi lên server để giảm dung lượng.
 * - Giới hạn chiều rộng tối đa 1600px (đủ để OCR đọc chữ)
 * - Nén thành JPEG chất lượng 80%
 * - Ảnh 5MB gốc → ~200-400KB sau khi resize
 */
function resizeImage(file: File, maxWidth = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(resizedBase64);
      } catch (err) {
        reject(err);
      } finally {
        URL.revokeObjectURL(img.src);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Không thể đọc file ảnh.'));
    };
    img.src = URL.createObjectURL(file);
  });
}

export default function OcrUploader({ onOcrSuccess }: OcrUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Nâng giới hạn lên 10MB vì ảnh sẽ được resize trước khi gửi
    if (file.size > 10 * 1024 * 1024) {
      alert("Kích thước ảnh quá lớn (giới hạn 10MB).");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // Bước 1: Thu nhỏ ảnh trước khi gửi (giảm từ 5-8MB → vài trăm KB)
      const base64 = await resizeImage(file);

      // Bước 2: Gửi ảnh đã thu nhỏ lên API OCR
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
    } catch (error) {
      console.error('OCR upload error:', error);
      alert('Lỗi kết nối máy chủ OCR.');
    } finally {
      // Duy nhất 1 chỗ tắt loading — tránh gọi nhiều lần
      setLoading(false);
    }

    // Reset file input để có thể chọn lại cùng 1 file
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 transition-colors select-none">
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
        <div className="flex flex-col items-center justify-center animate-pulse duration-700 bg-white w-full py-5 rounded-[16px] shadow-sm border border-[#0253af]/10">
          <Loader2 className="w-8 h-8 text-[#0253af] animate-spin mb-2" />
          <p className="text-[14px] text-[#0253af] text-center font-bold">AI đang phân tích ảnh...</p>
          <p className="text-[12px] text-gray-500 text-center mt-1">Vui lòng đợi vài giây</p>
        </div>
      ) : success ? (
        <div className="flex flex-col items-center justify-center animate-slide-up bg-[#f0fdf4] w-full py-5 rounded-[16px] border border-green-200">
          <CheckCircle2 className="w-9 h-9 text-green-500 mb-2" />
          <p className="text-[14px] text-green-600 font-extrabold text-center">Trích xuất thành công!</p>
          <p className="text-[12px] text-green-700/80 text-center mt-0.5">Các thông tin đã được tự động điền</p>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-center gap-8 items-center bg-white px-5 py-4 rounded-[16px] shadow-sm border border-[#0253af]/15">
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
