'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Book {
  id: number
  title: string
  author: string
  year: number
  category: string
  description: string
  isbn: string
  coverUrl: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalBooks: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0,
    hasNextPage: false,
    hasPreviousPage: false
  })

  const fetchBooks = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        search: searchQuery,
        sort: searchQuery ? 'relevance' : 'title'
      })
      
      const response = await fetch(`/api/books?${params}`)
      const data = await response.json()
      
      setBooks(data.books)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [currentPage, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on new search
    fetchBooks()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Catalog</h1>
      
      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && (
        <div className="mb-4 text-gray-600">
          Showing {books.length} of {pagination.totalBooks} books
        </div>
      )}

      {/* Books Grid */}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={book.coverUrl || '/placeholder-cover.jpg'}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{book.title}</h2>
                  <p className="text-gray-600 mb-2">By {book.author}</p>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{book.description}</p>
                  <div className="text-sm text-gray-500">
                    <span>{book.year}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    ISBN: {book.isbn}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={!pagination.hasPreviousPage}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Note about browsing */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          Note: Books are available for browsing only and cannot be taken off the premises.
        </p>
      </div>
    </div>
  )
}
