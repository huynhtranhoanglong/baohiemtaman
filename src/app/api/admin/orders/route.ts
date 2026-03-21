import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const glAuth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: glAuth });
    const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

    // Fetch from row 2 downward
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A2:P',
    });

    const rows = response.data.values || [];
    
    // Map raw array to objects
    const orders = rows.map((row) => ({
      timestamp: row[0] || '',
      provider: row[1] || '',
      startDate: row[3] || '',
      endDate: row[4] || '',
      vehicleType: row[5] || '',
      plate: row[6] || '',
      chassis: row[7] || '',
      engine: row[8] || '',
      email: row[9] || '',
      amount: row[12] || '',
      customerName: row[13] || '',
      orderId: row[15] || '',
    })).reverse(); // Reverse so newest orders are at the top
    
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    console.error('Lỗi khi fetch Google Sheets:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi đọc Dữ liệu Đơn hàng' },
      { status: 500 }
    );
  }
}
