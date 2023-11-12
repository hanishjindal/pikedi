import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToasterContext from './context/ToasterContext'
import { Providers } from '@/redux/provider'
import { BRAND } from '@/components/config'
import AuthContext from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${BRAND.name}`,
  description: `${BRAND.info}`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToasterContext />
          <AuthContext>
            {children}
          </AuthContext>
        </Providers>
      </body>
    </html>
  )
}
