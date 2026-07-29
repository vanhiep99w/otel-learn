import { Provider } from '@/components/provider';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'OpenTelemetry Learning',
    template: '%s | OpenTelemetry Learning',
  },
  description: 'Tài liệu học OpenTelemetry từ nền tảng đến vận hành production.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
