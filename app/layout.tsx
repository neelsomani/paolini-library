import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paolini Library',
  description: 'A collection of military history books at the Veteran\'s Memorial Building in Danville, CA',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-50 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            Website built by Neel Somani for the benefit of American Legion Post 246
          </div>
        </footer>
      </body>
    </html>
  )
}
