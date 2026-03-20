// =============================================
// THÔNG TIN DỰ ÁN
// =============================================
export const PROJECT_INFO = {
  BRAND_NAME: 'Bảo hiểm Tâm An',
  SHORT_NAME: 'Tâm An',
} as const;

// =============================================
// GIÁ BẢO HIỂM (VNĐ / năm)
// =============================================
export const PRICING = {
  /** Bảo hiểm bắt buộc — xe máy trên 50cc */
  MANDATORY_ABOVE_50CC: 66000,
  /** Bảo hiểm bắt buộc — xe máy dưới 50cc & xe điện */
  MANDATORY_BELOW_50CC: 60500,
  /** Bảo hiểm tự nguyện — phí thêm mỗi năm */
  VOLUNTARY_PER_YEAR: 20000,
} as const;

// =============================================
// QUYỀN LỢI CHI TRẢ
// =============================================
export const BENEFITS = {
  VICTIM_PERSON: 'Tối đa 150 triệu/người/vụ',
  VICTIM_PROPERTY: 'Tối đa 50 triệu/vụ',
  OWNER_PERSON: 'Tối đa 10 triệu/người/vụ',
  OWNER_PERSON_DETAIL: 'Tối đa 10 triệu/người/vụ (2 người)',
  OWNER_COUNT: '02 người',
} as const;

// =============================================
// LOẠI XE
// =============================================
export const VEHICLE_TYPE_IDS = {
  ABOVE_50CC: '>50cc',
  BELOW_50CC: '<=50cc',
  ELECTRIC: 'electric',
} as const;

/** Label hiển thị ngắn cho selector */
export const VEHICLE_TYPES = [
  { id: VEHICLE_TYPE_IDS.ABOVE_50CC, label: 'Xe > 50cc', iconName: 'Gauge' as const },
  { id: VEHICLE_TYPE_IDS.BELOW_50CC, label: 'Xe ≤ 50cc', iconName: 'Moped' as const },
  { id: VEHICLE_TYPE_IDS.ELECTRIC, label: 'Xe máy điện', iconName: 'Zap' as const },
];

/** Label đầy đủ cho trang xác nhận */
export const VEHICLE_LABELS: Record<string, string> = {
  [VEHICLE_TYPE_IDS.ABOVE_50CC]: 'Xe máy trên 50cc',
  [VEHICLE_TYPE_IDS.BELOW_50CC]: 'Xe máy dưới 50cc',
  [VEHICLE_TYPE_IDS.ELECTRIC]: 'Xe máy điện',
};

// =============================================
// NHÀ BẢO HIỂM
// =============================================
export const PROVIDER_IDS = {
  DBV: 'dbv',
} as const;

export const PROVIDER_NAMES: Record<string, string> = {
  [PROVIDER_IDS.DBV]: 'DBV Insurance',
};

export const PROVIDER_DATA: Record<string, {
  title: string;
  bg: string;
  text: string;
  info: string;
  logo: string;
  achievements: string[];
}> = {
  [PROVIDER_IDS.DBV]: {
    title: 'DBV Insurance (Tổng Công ty Cơ phần Bảo hiểm Hàng không)',
    bg: 'bg-blue-100',
    text: 'text-[#0253af]',
    logo: '/assets/dbv-logo-ngang.svg',
    info: 'Tiền thân là Bảo hiểm Hàng không (VNI), chính thức đổi tên thành DBV Insurance vào tháng 5/2025 với sự hậu thuẫn tài chính mạnh mẽ từ DB Insurance Hàn Quốc (nắm giữ 75% cổ phần).',
    achievements: [
      'Năng lực tài chính xuất sắc, bệ phóng từ tập đoàn DB Insurance hạng AA+ (AM Best).',
      'Ứng dụng AI và Big Data tối ưu hóa quy trình khai báo, giám định và bồi thường.',
      'Mục tiêu trở thành công ty có tốc độ bồi thường nhanh nhất thị trường.',
    ],
  },
};

// =============================================
// FORM DEFAULTS
// =============================================
export const DEFAULT_FORM_DATA = {
  duration: 1,
  startDate: '',   // sẽ được gán TODAY lúc runtime
  endDate: '',
  vehicleType: VEHICLE_TYPE_IDS.ABOVE_50CC as string,
  ownerName: '',
  address: '',
  licensePlate: '',
  engineNumber: '',
  chassisNumber: '',
  email: '',
  phone: '',
  isVoluntaryIncluded: true,
  provider: PROVIDER_IDS.DBV as string,
};

// =============================================
// VALIDATION
// =============================================
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[0-9]{10}$/;

export const VALIDATION_MESSAGES = {
  ownerName: 'Vui lòng nhập tên chủ xe',
  address: 'Vui lòng nhập địa chỉ thường trú',
  licensePlate: 'Vui lòng nhập biển số xe',
  engineNumber: 'Vui lòng nhập số máy',
  chassisNumber: 'Vui lòng nhập số khung',
  email: 'Vui lòng nhập đúng định dạng Email',
  phone: 'Vui lòng nhập đủ 10 số điện thoại',
} as const;

// =============================================
// API ENDPOINTS
// =============================================
export const API = {
  SUBMIT_ORDER: '/api/submit-order',
} as const;

// =============================================
// EXTERNAL URLS
// =============================================
export const EXTERNAL_URLS = {
  REGULATION_PDF: 'https://cdn.globalcare.vn/private/document/pdf/tndsbb-xe-may/NGHI_DINH_VE_BHBB_TNDS_CUA_CHU_XE_CO_GIOI.pdf',
} as const;

// =============================================
// SOCIAL PROOF
// =============================================
export const SOCIAL_PROOF = {
  text: 'Hơn 5,000 hợp đồng đã phát hành qua Tâm An',
  avatars: [
    '/assets/social-proof-avatar-1.webp',
    '/assets/social-proof-avatar-2.webp',
    '/assets/social-proof-avatar-3.webp',
  ],
} as const;

// =============================================
// HERO COMMITMENTS
// =============================================
export const HERO_COMMITMENTS = [
  {
    title: 'Quét cavet tự động',
    desc: 'Không cần nhập thông tin thủ công',
  },
  {
    title: 'Nhận giấy chứng nhận sau 1 phút',
    desc: 'Bản điện tử gửi siêu tốc ngay khi thanh toán',
  },
  {
    title: 'Hợp lệ theo quy định',
    desc: 'Đầy đủ giá trị pháp lý khi xuất trình cho CSGT',
  },
] as const;
