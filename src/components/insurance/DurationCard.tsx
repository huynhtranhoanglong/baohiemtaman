import React, { useEffect } from 'react';

interface DurationCardProps {
  duration: number; // 1, 2, 3
  startDate: string; // YYYY-MM-DD
  endDate: string; // text computed
  onChangeDuration: (val: number) => void;
  onChangeStartDate: (val: string) => void;
  setEndDate: (val: string) => void;
}

export default function DurationCard({ 
  duration, 
  startDate, 
  endDate, 
  onChangeDuration, 
  onChangeStartDate, 
  setEndDate 
}: DurationCardProps) {

  // Auto calculate end date based on start date and duration
  useEffect(() => {
    if (!startDate) return;
    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + duration);
    end.setDate(end.getDate() - 1); // 1 year is 365 days, so we minus 1 day to be exact
    
    // Format to DD/MM/YYYY for Vietnam locale reading
    const formattedEnd = `${String(end.getDate()).padStart(2, '0')}/${String(end.getMonth() + 1).padStart(2, '0')}/${end.getFullYear()}`;
    setEndDate(formattedEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, duration]);

  return (
    <div className="bg-white rounded-[12px] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-y-4 mb-4">
      <h3 className="font-bold text-[#1a1a1a] text-[16px] mb-2">Thời hạn bảo hiểm</h3>
      
      <div className="flex gap-6 mb-2">
        {[1, 2, 3].map((years) => (
          <label key={years} className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${duration === years ? 'border-[#0253af]' : 'border-gray-300'}`}>
               {duration === years && <div className="w-2.5 h-2.5 rounded-full bg-[#0253af]" />}
            </div>
            <span className="text-[14px] font-medium text-[#4b5563]">{years} năm</span>
            {/* Ẩn input html gốc */}
            <input 
              type="radio" 
              name="duration" 
              value={years} 
              checked={duration === years} 
              onChange={() => onChangeDuration(years)} 
              className="hidden" 
            />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {/* Start Date */}
        <div className="relative pt-2">
          <label className="absolute top-0 left-3 z-10 bg-white px-1 text-[11px] font-bold text-[#4b5563]">
            Bắt đầu
          </label>
          <div className="relative border border-gray-300 rounded-[12px] focus-within:border-[#0253af] transition-colors bg-white">
            <input 
              type="date" 
              className="w-full px-4 py-[14px] text-[15px] font-medium text-[#1a1a1a] !outline-none rounded-[12px] bg-transparent" 
              value={startDate}
              onChange={(e) => onChangeStartDate(e.target.value)}
            />
          </div>
        </div>

        {/* End Date (Read Only) */}
        <div className="relative pt-2 opacity-60">
          <label className="absolute top-0 left-3 z-10 bg-[#f4f5f7] px-1 text-[11px] font-bold text-[#4b5563]">
            Kết thúc
          </label>
          <div className="relative border border-gray-200 rounded-[12px] bg-[#f4f5f7]">
            <input 
              type="text" 
              readOnly 
              className="w-full px-4 py-[14px] text-[15px] font-medium text-[#1a1a1a] !outline-none rounded-[12px] bg-transparent cursor-not-allowed" 
              placeholder="dd/mm/yyyy" 
              value={endDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
