import React from 'react';

interface ConfirmSummaryProps {
  formData: {
    duration: number;
    startDate: string;
    endDate: string;
    vehicleType: string;
    licensePlate: string;
    chassisNumber: string;
    engineNumber: string;
    email: string;
    phone: string;
    isVoluntaryIncluded: boolean;
    provider: string;
  };
  onEdit: () => void;
}

export default function ConfirmSummary({ formData, onEdit }: ConfirmSummaryProps) {
  // Helpers hiển thị Tên Hãng, Ngày, Loại xe
  const providerNames: Record<string, string> = {
    dbv: 'DBV Insurance',
    mic: 'Bảo hiểm Quân Đội (MIC)',
    pvi: 'Bảo hiểm PVI',
    tci: 'TechcomInsurance (TCI)'
  };
  
  const vehicleLabels: Record<string, string> = {
    '>50cc': 'Xe máy trên 50cc',
    '<=50cc': 'Xe máy dưới 50cc',
    'electric': 'Xe máy điện'
  };

  const formatDate = (ds: string) => {
    if (!ds) return '';
    const parts = ds.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return ds;
  };

  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 mb-4 animate-slide-up">
      {/* Nhóm 1: Sản phẩm */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#1a1a1a] text-[16px]">Thông tin bảo hiểm</h3>
          <button onClick={onEdit} className="text-[#0253af] font-semibold text-[13px] hover:underline">
            Sửa
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-start text-[14px]">
            <span className="text-[#4b5563] w-1/3">Sản phẩm</span>
            <span className="font-semibold text-[#1a1a1a] w-2/3 text-right">Bảo hiểm xe máy bắt buộc</span>
          </div>
          {formData.isVoluntaryIncluded && (
             <div className="flex justify-between items-start text-[14px]">
               <span className="text-[#4b5563] w-1/3">Bổ sung</span>
               <span className="font-semibold text-[#1a1a1a] w-2/3 text-right">Bảo hiểm tai nạn chủ xe và người ngồi trên xe</span>
             </div>
          )}
          <div className="flex justify-between items-start text-[14px]">
            <span className="text-[#4b5563] w-1/3">Nhà bảo hiểm</span>
            <span className="font-semibold text-[#1a1a1a] w-2/3 text-right">{providerNames[formData.provider] || 'hãng'}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Thời hạn</span>
            <span className="font-semibold text-[#1a1a1a]">{formData.duration} năm</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Hiệu lực</span>
            <span className="font-semibold text-[#1a1a1a]">{formatDate(formData.startDate)} - {formatDate(formData.endDate)}</span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 my-4" />

      {/* Nhóm 2: Thông tin xe */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#1a1a1a] text-[16px]">Thông tin xe</h3>
          <button onClick={onEdit} className="text-[#0253af] font-semibold text-[13px] hover:underline">
            Sửa
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Loại xe</span>
            <span className="font-semibold text-[#1a1a1a]">{vehicleLabels[formData.vehicleType] || 'Không rõ'}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Biển số xe</span>
            <span className="font-semibold text-[#1a1a1a]">{formData.licensePlate || 'Không có'}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Số máy</span>
            <span className="font-semibold text-[#1a1a1a]">{formData.engineNumber || 'Không có'}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Số khung</span>
            <span className="font-semibold text-[#1a1a1a]">{formData.chassisNumber || 'Không có'}</span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 my-4" />

      {/* Nhóm 3: Thông tin người nhận */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#1a1a1a] text-[16px]">Người nhận GCN</h3>
          <button onClick={onEdit} className="text-[#0253af] font-semibold text-[13px] hover:underline">
            Sửa
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Số điện thoại</span>
            <span className="font-semibold text-[#1a1a1a]">{formData.phone || 'Chưa nhập'}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#4b5563]">Email</span>
            <span className="font-semibold text-[#1a1a1a] truncate ml-4">{formData.email || 'Chưa nhập'}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
