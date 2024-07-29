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

// --- Destructuring Objects {}
const book = getBook(2);
const { title, author, pages, genres, publicationDate, hasMovieAdaptation } =
  book;
console.log(author, title, genres);

// --- Destructuring Arrays []
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre, secondaryGenre, ...otherGenres);

// --- Logical Operators

// A) Logical AND (&&)
// The logical AND operator (&&) evaluates two expressions, it immediately returns the first expression if its falsy, else returns the second expression
//  It is commonly used to check multiple conditions
// Falsy Values for (&&): 0, '', null, undefined

console.log(true && 'Some String');
console.log(false && 'Some String');
console.log(0 && 'Some String');

// If the hasMovieAdaptation === true we are returned with 'This book has a movie'
console.log(hasMovieAdaptation && 'This book has a movie');

// Here jonas is considered a truthy value hence we get the other string as O/P
console.log('Jonas' && 'Some Sting');

// 2. Logical OR (||)
// The logical OR operator (||) evaluates two expressions and returns the first truthy expression it encounters; if neither is truthy, it returns the last expression
//  It is commonly used to set default
// Falsy Values for (||): 0, '', null, undefined

console.log(true || 'Some string');
console.log(false || 'Some String');

console.log(book.translations.spanish);

// If the Book whose data is retrieved does not have the spanish translation we set teh default value as 'Not Translated in Spanish!'
const spanishTranslation =
  book.translations.spanish || 'Not Translated in Spanish!';
spanishTranslation;

// Problem with Logical OR (||)
// The problem with using the logical OR (||) operator in this context is that it considers any falsy value (such as 0, false, null, undefined, NaN, or an empty string '') as equivalent to false
// Therefore, if book.reviews.librarything.reviewsCount is 0, the logical OR operator will treat it as falsy and will return the fallback value 'No Data', even though 0 is a valid and meaningful value for reviewsCount
console.log(book.reviews.librarything.reviewsCount);
const countWrong = book.reviews.librarything.reviewsCount || 'No Data';
countWrong;

// C) Nullish Coalescing (??)
// The nullish coalescing operator (??) addresses this issue by only considering null and undefined as nullish values
// It's same as the (||) but here it only considers the null & undefined as the falsy values
// Falsy Values for (??): null, undefined
const count = book.reviews.librarything.reviewsCount ?? 'No Data';
count;
