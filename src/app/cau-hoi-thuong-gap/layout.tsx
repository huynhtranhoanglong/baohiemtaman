import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Câu hỏi thường gặp (FAQ) | Bảo hiểm Tâm An',
  description: 'Giải đáp các thắc mắc về bảo hiểm xe máy điện tử tại Tâm An. Giấy chứng nhận hợp lệ theo nghị định 67/2023/NĐ-CP.',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
