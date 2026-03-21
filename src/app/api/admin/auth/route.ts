import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { message: 'Mật khẩu trang Admin chưa được thiết lập trên server.' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      // Set HTTP-only cookie
      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 tuần
        path: '/',
      });
      
      return response;
    }

    return NextResponse.json(
      { message: 'Mật khẩu không chính xác.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Request không hợp lệ.' },
      { status: 400 }
    );
  }
}
