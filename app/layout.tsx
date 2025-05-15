import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

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
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
          Website built by Neel Somani and donated to American Legion Post 246
        </footer>
      </body>
    </html>
  )
}
