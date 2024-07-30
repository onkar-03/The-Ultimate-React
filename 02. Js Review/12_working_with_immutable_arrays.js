// Array that contains 5 Book Objects
const data = [
  // Book 1
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  // Book 2
  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  // Book 3
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  // Book 4
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  // Book 5
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

// Returns all the Data
function getBooks() {
  return data;
}

// Returns the Data about Book whose id was passed
function getBook(id) {
  return data.find((d) => d.id === id);
}

function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}

// --- Array Methods
// The Array methods .map(), .filter(), .reduce() are called functional array methods as they do not mutate the original array instead return a new array based on original one

// Getting all books from the Data
const books = getBooks();
books;

// In React many operations need to be immutable i.e operations where we don't manipulate the original data
// Hence we will learn how to add, delete and update elements of Data without mutating the original

// 1) Add a Book object to the Array
const newBook = {
  id: 6,
  title: 'Learning JavaScript',
  publicationDate: '2024-07-31',
  author: 'Onkar',
  genres: ['Coding'],
  hasMovieAdaptation: false,
  pages: 100,
  translations: {},
  reviews: {
    goodreads: {
      rating: 0,
      ratingsCount: 0,
      reviewsCount: 0,
    },
    librarything: {
      rating: 0,
      ratingsCount: 0,
      reviewsCount: 0,
    },
  },
};

// Using the Spread Operator to create a new Array including the Elements of the existing array and the newly added book
const booksAfterAddingNewBook = [...books, newBook];
console.log(booksAfterAddingNewBook);

// 2) Delete a Book object from the Array
// Deleting a Book with id 3 & not including it in the new Array
// For filtering out book 3 we use the .filter() method of Arrays
const booksAfterDelete = booksAfterAddingNewBook.filter(
  (book) => book.id !== 3,
);

// 3) Update a Book Object in the Array

// After updating a Book from the Books Array we should have the same length as before
// The .map() is used to create a new array of the same length as before
// Update the Book Object with id 1 to by adding a new property named updated as true, else do nothing simply return the book Object as it is in the new Array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id == 1 ? { ...book, updated: true } : book,
);
console.log(booksAfterUpdate);

// ! IMPORTANT: In all these process we created a new Array and did not mutate the Original Books data we had
