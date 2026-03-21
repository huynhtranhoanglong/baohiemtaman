import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { toEmail, customerName, templateHtml } = await request.json();

    if (!toEmail || !templateHtml) {
      return NextResponse.json({ message: 'Thiếu thông tin nhận hoặc nội dung template.' }, { status: 400 });
    }

    const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { message: 'Chưa cấu hình EMAIL_USER hoặc EMAIL_APP_PASSWORD trong .env.local.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Standard Gmail / Google Workspace integration
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Bảo hiểm Tâm An" <${EMAIL_USER}>`,
      to: toEmail,
      subject: `Thông báo thanh toán - Bảo hiểm Tâm An (${customerName})`,
      html: templateHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId }, { status: 200 });
  } catch (error: any) {
    console.error('Lỗi khi gửi email:', error);
    return NextResponse.json({ message: 'Lỗi gửi email: ' + error.message }, { status: 500 });
  }
}
