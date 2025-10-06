import { ReactNode } from 'react';
import { Metadata } from 'next';

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  icons: {
    icon: 'https://rickandmortyapi.com/favicon-32x32.png',
  }
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
