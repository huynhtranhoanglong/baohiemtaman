import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { PROJECT_INFO } from "@/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.baohiemtaman.com'),
  title: PROJECT_INFO.BRAND_NAME,
  description: `Trang đăng ký bảo hiểm xe máy trực tuyến ${PROJECT_INFO.SHORT_NAME}.`,
  keywords: ['bảo hiểm xe máy', 'bảo hiểm bắt buộc', 'mua bảo hiểm online', 'mua bảo hiểm xe máy điện tử', 'Tâm An', 'bảo hiểm Tâm An'],
  authors: [{ name: PROJECT_INFO.BRAND_NAME }],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/assets/baohiemtaman-logo.svg",
  },
  openGraph: {
    title: PROJECT_INFO.BRAND_NAME,
    description: `Trang đăng ký bảo hiểm xe máy trực tuyến ${PROJECT_INFO.SHORT_NAME}. Quét cavet tự động, nhận giấy chứng nhận điện tử sau 1 phút.`,
    url: '/',
    siteName: PROJECT_INFO.BRAND_NAME,
    images: [
      {
        url: '/assets/main-banner.webp',
        width: 1200,
        height: 630,
        alt: `Banner bảo hiểm xe máy ${PROJECT_INFO.SHORT_NAME}`,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PROJECT_INFO.BRAND_NAME,
    description: `Trang đăng ký bảo hiểm xe máy trực tuyến ${PROJECT_INFO.SHORT_NAME}. Nhận giấy chứng nhận điện tử sau 1 phút.`,
    images: ['/assets/main-banner.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
