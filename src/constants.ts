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
      'Mục tiêu mang lại tốc độ bồi thường nhanh chóng và tối ưu cho khách hàng.',
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
  referrerCode: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
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
    desc: 'Bản điện tử nhận ngay sau khi thanh toán thành công',
  },
  {
    title: 'Hợp lệ theo quy định',
    desc: 'Đầy đủ giá trị pháp lý khi xuất trình cho CSGT',
  },
] as const;

// =============================================
// FAQ (CÂU HỎI THƯỜNG GẶP)
// =============================================
export const FAQ_ITEMS = [
  {
    question: 'Xuất trình Giấy chứng nhận bảo hiểm điện tử (PDF) trên điện thoại cho CSGT có hợp lệ không?',
    answer: 'Rất hợp lệ và tiện lợi. Căn cứ theo Khoản 3 Điều 10, Nghị định 67/2023/NĐ-CP, Giấy chứng nhận bảo hiểm điện tử có giá trị pháp lý tương đương với bản giấy truyền thống.\n\nKhi được yêu cầu, bạn chỉ cần mở file PDF lưu trên điện thoại di động (qua Zalo hoặc Email) để xuất trình. Cơ quan chức năng sẽ quét mã QR trên giấy để tra cứu trực tiếp trên hệ thống cơ sở dữ liệu.\n\nTại Tâm An, các chứng nhận điện tử được cấp phát từ hệ thống của Tổng Công ty Bảo hiểm Hàng không (DBV), đảm bảo đúng chuẩn quy định pháp luật và có hiệu lực trên toàn quốc.',
  },
  {
    question: 'Nếu không có Bảo hiểm xe máy, tôi sẽ bị phạt bao nhiêu tiền khi bị kiểm tra?',
    answer: 'Theo quy định mới nhất tại Khoản 2 Điều 18 Nghị định 168/2024/NĐ-CP (áp dụng từ 01/01/2025), người không mang theo hoặc không có Giấy chứng nhận bảo hiểm bắt buộc TNDS còn hiệu lực sẽ bị xử phạt hành chính từ 200.000 đồng đến 300.000 đồng.\n\nVới chi phí gia hạn chỉ khoảng 60.500đ/năm, trang bị bảo hiểm tại Tâm An tiết kiệm hơn rất nhiều so với mức tiền phạt. Thêm vào đó, đây còn là giải pháp san sẻ gánh nặng tài chính vững chắc, hỗ trợ chi trả bồi thường cho bên thứ ba nếu chẳng may xảy ra va chạm trên đường.',
  },
  {
    question: 'Vì sao nên trang bị thêm Bảo hiểm xe máy Tự nguyện kèm với Bảo hiểm Bắt buộc?',
    answer: 'Bảo hiểm TNDS Bắt buộc là loại hình bắt buộc để chi trả bồi thường cho bên thứ ba (người, tài sản bị va chạm) nhằm giảm gánh nặng tài chính nếu bạn có lỗi, nhưng loại hình này lại không bồi thường thiệt hại cho chính bạn hay người đi theo.\n\nĐể khắc phục khoảng trống đó, Bảo hiểm tai nạn Tự nguyện (dành cho người ngồi trên xe) là giải pháp bảo vệ bổ sung với mức phí chỉ 20.000đ/năm. Loại hình này hỗ trợ chi trả các rủi ro tổn thất về thân thể cho tối đa 02 người trên xe khi không may có tai nạn, với hạn mức bảo vệ lên đến 10 triệu đồng/người/vụ. Trang bị cả 2 loại hình này sẽ đem lại cho bạn sự an tâm vững vàng trên mọi chặng đường.',
  },
  {
    question: 'Sau khi mua tôi có nhận được bảo hiểm bản cứng không? Bản điện tử có lợi ích gì?',
    answer: 'Khách hàng sẽ không cần thẻ giấy cứng mà sẽ nhận được ngay tài liệu Giấy chứng nhận bảo hiểm điện tử (được cấp phát từ hệ thống DBV) gửi trực tiếp qua Zalo hoặc Email cá nhân sau khi thanh toán thành công.\n\nSử dụng bản điện tử thay thế mang lại những điểm cộng cực kỳ ưu việt: Bạn không phải chờ đợi bưu tá mất thời gian, giúp bạn xóa bỏ nỗi lo rách nát, thất lạc hay quên mang theo giấy tờ. Khi lưu thông, bạn chỉ việc mở file lưu sẵn trên điện thoại di động mọi lúc mọi nơi để xuất trình.\n\nBên cạnh tính tiện lợi và an toàn cho người sử dụng, việc áp dụng bản điện tử còn trực tiếp góp phần chung tay bảo vệ môi trường và thúc đẩy tiến trình chuyển đổi số quốc gia.',
  }
];
