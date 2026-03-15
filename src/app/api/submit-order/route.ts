import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Mapping Dữ liệu từ Client
    const {
      duration,
      startDate,
      endDate,
      vehicleType,
      licensePlate,
      chassisNumber,
      engineNumber,
      ownerName,    // Tên chủ xe / khách hàng
      address,      // Địa chỉ khách hàng
      email,
      phone,
      isVoluntaryIncluded,
      provider,
      totalPrice,
      createdAt
    } = body;

    // Chuẩn bị Xác thực Google (Auth)
    const glAuth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth: glAuth });

    // Thay thế bằng SPREADSHEET ID thực tế của Khách hàng
    const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

    // --- Xử lý Format Thời gian ---
    // 1. Cột Thời gian nạp dữ liệu (GMT+7 Việt Nam)
    const now = new Date();
    // Use format: YYYY/MM/DD HH:mm:ss
    const tzOffset = 7 * 60; // offset in minutes
    const localNow = new Date(now.getTime() + tzOffset * 60 * 1000);
    const yyyy = localNow.getUTCFullYear();
    const mm = String(localNow.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(localNow.getUTCDate()).padStart(2, '0');
    const hh = String(localNow.getUTCHours()).padStart(2, '0');
    const min = String(localNow.getUTCMinutes()).padStart(2, '0');
    const ss = String(localNow.getUTCSeconds()).padStart(2, '0');
    const gmt7DateString = `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;

    // 2. Chuyển startDate từ input (YYYY-MM-DD) sang YYYY/MM/DD
    let formattedStartDate = startDate;
    if (startDate && startDate.includes('-')) {
      formattedStartDate = startDate.replace(/-/g, '/'); // "2026/03/15"
    }

    // 3. Chuyển endDate từ Frontend (DD/MM/YYYY) về YYYY/MM/DD
    let formattedEndDate = endDate;
    if (endDate && endDate.includes('/')) {
      const parts = endDate.split('/'); // ["15", "03", "2027"]
      if (parts.length === 3 && parts[0].length === 2 && parts[2].length === 4) {
        formattedEndDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    // --- Ghi dữ liệu vào cuối Bảng (Append) ---
    // Thứ tự Cột yêu cầu: 
    // THỜI GIAN, CTY BẢO HIỂM, SỐ NĂM, BẮT ĐẦU, KẾT THÚC, LOẠI XE, BIỂN SỐ, SỐ KHUNG, SỐ MÁY, EMAIL, SỐ ĐIỆN THOẠI, TỰ NGUYỆN?, TỔNG TIỀN, TÊN KHÁCH HÀNG, ĐỊA CHỈ
    const rowData = [
      gmt7DateString,              // A: THỜI GIAN (GMT+7)
      provider.toUpperCase(),      // B: CTY BẢO HIỂM
      duration,                    // C: SỐ NĂM
      formattedStartDate,          // D: BẮT ĐẦU (YYYY/MM/DD)
      formattedEndDate,            // E: KẾT THÚC (YYYY/MM/DD)
      vehicleType,                 // F: LOẠI XE
      licensePlate || '',          // G: BIỂN SỐ
      chassisNumber || '',         // H: SỐ KHUNG
      engineNumber || '',          // I: SỐ MÁY
      email,                       // J: EMAIL
      phone,                       // K: SỐ ĐIỆN THOẠI
      isVoluntaryIncluded ? 'Có' : 'Không', // L: TỰ NGUYỆN?
      totalPrice,                  // M: TỔNG TIỀN
      ownerName || '',             // N: TÊN KHÁCH HÀNG
      address || ''                // O: ĐỊA CHỈ
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A:O', // Cột mở rộng đến O
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json(
      { success: true, message: 'Ghi đơn thành công', data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi khi ghi Google Sheets:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi Hệ Thống' },
      { status: 500 }
    );
  }
}
