'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Book {
  id: number
  title: string
  author: string
  isbn?: string
  coverUrl: string
  collectionNumber: string
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
  const [searchInput, setSearchInput] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
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
        sort: searchQuery ? 'relevance' : 'title',
        letter: selectedLetter || ''
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
  }, [currentPage, searchQuery, selectedLetter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on new search
    setSelectedLetter(null) // Clear letter filter when searching
    setSearchQuery(searchInput) // Update the actual search query
  }

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter === selectedLetter ? null : letter)
    setCurrentPage(1)
    setSearchQuery('')
    setSearchInput('') // Clear the search input when selecting a letter
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

      {/* Alphabet Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors
                ${selectedLetter === letter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {letter}
            </button>
          ))}
        </div>
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
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{book.title}</h2>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {book.collectionNumber}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">By {book.author}</p>
                  {book.isbn && (
                    <div className="mt-2 text-xs text-gray-400">
                      ISBN: {book.isbn}
                    </div>
                  )}
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
