import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'AnyGroupLLC',
  description: 'AnyGroupLLC Website!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-12">{children}</div>
      </body>
    </html>
  );
}
