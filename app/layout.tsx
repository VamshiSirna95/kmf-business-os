import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KMF Business OS',
  description: 'K.M. Fashions Business Command Centre',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
