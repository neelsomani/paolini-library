import { NextResponse } from 'next/server'
import { books } from '@/data/books'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'title'
  const letter = searchParams.get('letter') || ''

  // Helper function to clean titles
  const cleanTitle = (title: string) => title.replace(/["']/g, '').trim()

  // Filter books based on search query and/or letter
  let filteredBooks = books
  
  // If there's a search query, search across all books
  if (search) {
    const searchLower = search.toLowerCase()
    filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      (book.isbn && book.isbn.includes(search))
    )
  } 
  // If no search query but there is a letter filter, apply letter filtering
  else if (letter) {
    filteredBooks = books.filter(book => {
      const title = cleanTitle(book.title)
      if (letter === '0-9') {
        // Check if the title starts with any digit
        return /^\d/.test(title)
      }
      return title.toUpperCase().startsWith(letter)
    })
  }

  // Sort books
  if (sort === 'title') {
    filteredBooks.sort((a, b) => {
      const titleA = cleanTitle(a.title)
      const titleB = cleanTitle(b.title)
      return titleA.localeCompare(titleB)
    })
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