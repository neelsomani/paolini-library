export interface Book {
  id: number
  title: string
  author: string
  year: number
  category: string
  description: string
  isbn: string
  coverUrl: string
}

export const books: Book[] = [
  {
    id: 1,
    title: "The Second World War",
    author: "Winston Churchill",
    year: 1948,
    category: "WWII History",
    description: "A comprehensive six-volume history of World War II written by the British Prime Minister who led his country through the conflict.",
    isbn: "978-0395416853",
    coverUrl: "https://m.media-amazon.com/images/I/71YHjVXyU0L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 2,
    title: "Band of Brothers",
    author: "Stephen E. Ambrose",
    year: 1992,
    category: "WWII History",
    description: "The story of Easy Company, 506th Regiment of the 101st Airborne Division, U.S. Army, from their training in 1942 through D-Day and the end of World War II.",
    isbn: "978-0743464116",
    coverUrl: "https://m.media-amazon.com/images/I/91YHjVXyU0L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 3,
    title: "The Rise and Fall of the Third Reich",
    author: "William L. Shirer",
    year: 1960,
    category: "WWII History",
    description: "A comprehensive history of Nazi Germany from its origins to its defeat in World War II.",
    isbn: "978-0671728687",
    coverUrl: "https://m.media-amazon.com/images/I/71YHjVXyU0L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 4,
    title: "D-Day: June 6, 1944",
    author: "Stephen E. Ambrose",
    year: 1994,
    category: "WWII History",
    description: "A detailed account of the Allied invasion of Normandy on D-Day, based on interviews with veterans.",
    isbn: "978-0684801377",
    coverUrl: "https://m.media-amazon.com/images/I/91YHjVXyU0L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 5,
    title: "The Guns of August",
    author: "Barbara W. Tuchman",
    year: 1962,
    category: "WWI History",
    description: "A Pulitzer Prize-winning account of the first month of World War I, focusing on the political and military decisions that led to the conflict.",
    isbn: "978-0345386236",
    coverUrl: "https://m.media-amazon.com/images/I/71YHjVXyU0L._AC_UF1000,1000_QL80_.jpg"
  }
] 