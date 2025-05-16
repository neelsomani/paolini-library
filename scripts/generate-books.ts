const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvFilePath = path.join(process.cwd(), 'data', 'book-database.csv');
const outputPath = path.join(process.cwd(), 'data', 'books.ts');

// Read the CSV file
const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

// Parse CSV content
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true
});

// Transform the data
const books = records.map((record: any, index: number) => ({
  id: index + 1,
  title: record['Formatted Title'] || record['Raw Title'],
  author: record['Author'],
  isbn: record['ISBN'] || undefined,
  coverUrl: record['Cover Image URL'],
  collectionNumber: record['Collection']
}));

// Generate the TypeScript file content
const tsFileContent = `export interface Book {
  id: number
  title: string
  author: string
  isbn?: string
  coverUrl: string
  collectionNumber: string
}

export const books: Book[] = ${JSON.stringify(books, null, 2)}
`;

// Write the file
fs.writeFileSync(outputPath, tsFileContent);

console.log('Books data generated successfully!'); 