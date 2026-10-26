import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Command Brief',
  description: 'Personal founder morning dashboard for Jamil Yakasai.',
  openGraph: {
    title: 'Command Brief',
    description: 'Personal founder morning dashboard for Jamil Yakasai.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Command Brief',
    description: 'Personal founder morning dashboard for Jamil Yakasai.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="h-full bg-[#FAF9F6]">
      <body className="h-full text-[#171D27] antialiased">
        {children}
      </body>
    </html>
  );
}
