import { NextResponse } from 'next/server'
import { books } from '@/data/books'

// This would typically come from a database
const books = [
  {
    id: 1,
    title: "The Second World War",
    author: "Winston Churchill",
    year: 1948,
    category: "WWII History",
    description: "A comprehensive history of World War II",
    isbn: "978-0395416853"
  },
  {
    id: 2,
    title: "Band of Brothers",
    author: "Stephen E. Ambrose",
    year: 1992,
    category: "WWII History",
    description: "The story of Easy Company",
    isbn: "978-0743216381"
  },
  // Add more books as needed
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'title'

  // Filter books based on search query
  let filteredBooks = books
  if (search) {
    const searchLower = search.toLowerCase()
    filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.isbn.includes(search)
    )
  }

  // Sort books
  if (sort === 'title') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

  return NextResponse.json({
    books: paginatedBooks,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredBooks.length / limit),
      totalBooks: filteredBooks.length,
      hasNextPage: endIndex < filteredBooks.length,
      hasPreviousPage: page > 1
    }
  })
} 