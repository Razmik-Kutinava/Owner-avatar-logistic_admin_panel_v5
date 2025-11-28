import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Logistics Platform',
  description: 'Платформа управления логистикой',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

