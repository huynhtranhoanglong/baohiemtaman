# Tam An Insurance (Bảo hiểm Tâm An)

Dự án Hệ thống bán Bảo hiểm Bắt buộc / Tự nguyện dành cho Xe Máy điện tử.
Phân phối thông qua Global Care (Nhà bảo hiểm DBV).

## Kiến trúc
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + PostCSS
- **Forms & Tracking:** Tự động Autofill qua cấu trúc thẻ tham số URL, liên kết trực tiếp Google Sheets APIs.
- **Deploy:** Vercel (CI/CD)

## Quản trị (Admin)
- Đường dẫn truy cập Quản lý Đơn hàng: `/admin/orders`
- Cơ sở dữ liệu: Google Sheets API.

---

## Môi trường & Chạy cục bộ

```bash
npm run dev
# Mở trình duyệt với địa chỉ http://localhost:3000
```

---

## 📅 Changelog (Lịch sử cập nhật nền tảng)

### Bản cập nhật (04/04/2026)
- **feat:** Bổ sung Toàn tập Hệ thống Affiliate Marketing (Cộng tác viên).
  - Tự động bắt mã `ref`, `utm_source`, `utm_medium`, `utm_campaign` trên URL.
  - Xây dựng hệ thống Autofill mã Referrer nhờ lưu Offline (Web Storage).
  - Mở rộng Database Google Sheets (Cột Q-T) để bắt biến số của Affiliate.
  - Cập nhật trang Admin `/admin/orders` hỗ trợ hiển thị Nguồn của khách hàng.
- **chore:** Thêm file cấu hình `.npmrc` (`legacy-peer-deps`) nhằm sửa triệt để lỗi cài đặt của React 19 trên Server Vercel.

### Bản cập nhật trước đây
- Các tài liệu lõi và Marketing nội bộ được cấp quyền quản lý Offline riêng biệt tại máy cục bộ (ngăn đồng bộ trên Github để đảm bảo sự bảo mật của thuật toán Tracking Ads).
