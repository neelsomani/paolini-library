import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            Paolini Library
          </Link>
          <div className="flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Book Catalog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 