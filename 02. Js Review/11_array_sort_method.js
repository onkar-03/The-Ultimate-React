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

// 4. Sort Method
// In JavaScript is used to sort the elements of an array in place and returns the sorted array
// It is not a functional method it mutates the Original Array

// --- Working
// By default, .sort() converts elements to strings and compares their sequences of UTF-16 code unit values, which works well for simple alphabetical sorting. However, for more complex sorting (e.g., case-insensitive sorting or locale-aware sorting), you may need to provide a custom compare function
// When sorting numbers or objects in JavaScript, you often need to provide a compare function to the .sort() method to ensure they are sorted correctly
// This compare function determines the order of the elements

// --- What is a Compare Function ??
// A compare function takes two arguments (typically referred to as a and b). It returns a number that indicates their relative order:

// Ascending Order: a - b
// Ascending Order a - b Explanation:
// When a is less than b, a - b is negative. So, a will be placed before b
// When a is greater than b, a - b is positive. So, b will be placed before a
// When a is equal to b, a - b is zero. Their order will remain unchanged

// Descending Order: b - a
// Descending Order b - a Explanation:
// When b is less than a, b - a is negative. So, a will be placed before b
// When b is greater than a, b - a is positive. So, b will be placed before a
// When b is equal to a, b - a is zero. Their order will remain unchanged

// A) Numbers
// Ascending Order: a - b
// As it mutates the original array which we dont want hence we can first create a copy of the original array and then sort it
const arr = [2, 7, 3, 8, 9];
const sorted = arr.slice().sort((a, b) => a - b);
console.log(sorted);
console.log(arr);

// B) Objects
// Descending Order: b - a
// Created a copy of the original array here too using .slice()
// Descending order of Books as per Pages Number
const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
console.log(sortedByPages);
