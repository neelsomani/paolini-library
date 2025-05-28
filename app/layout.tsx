import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paolini Library - Book Catalog',
  description: 'Browse the Paolini Library collection of books. Search by title, author, or ISBN, or browse alphabetically. Built by Neel Somani.',
  keywords: 'library, books, catalog, reading, search, browse, alphabet, Paolini Library, Neel Somani',
  openGraph: {
    title: 'Paolini Library - Book Catalog',
    description: 'Browse the Paolini Library collection of books. Search by title, author, or ISBN, or browse alphabetically. Built by Neel Somani.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paolini Library - Book Catalog',
    description: 'Browse the Paolini Library collection of books. Search by title, author, or ISBN, or browse alphabetically. Built by Neel Somani.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  authors: [{ name: 'Neel Somani' }],
  icons: {
    icon: '/icon.svg',
  },
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
            Website <a href="https://github.com/neelsomani/paolini-library">built by Neel Somani</a> for the benefit of Veterans Memorial Building of San Ramon Valley
          </div>
        </footer>
      </body>
    </html>
  )
}
