import { useState, useEffect } from 'react';

// e2283e92
// http://www.omdbapi.com/?apikey=e2283e92&

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// API Key
const KEY = 'e2283e92';

// Structural Component
export default function App() {
  // --- Rendering Logic Code: which is at the top of the Component, it runs as the app renders on the screen

  // Listing State Up
  // As this state is required by both components hence lifting it up to the closest Parent App
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // States for Error Handling and Query
  const [error, setError] = useState('');
  const tempQuery = 'interstellar';

  // Lifting State Up to App from SearchBar
  const [query, setQuery] = useState('');

  // Fetch Data using API
  // As we should never create side effects in Render logic
  // But here we are fetching data in the Render Logic which is indeed creating a side effect
  // Also we are breaking teh React Rules here
  // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e2283e92&s=interstellar`)
  //   // Convert the received response from fetch to Json() using .json() function
  //   .then((res) => res.json())
  //   // .then((data) => setMovies(data.Search));
  //   // Log the Response Data
  //   .then((data) => console.log(data.Search));

  // --- Cons of Fetching data in Render Logic
  // On setting State here we are stuck in an infinite loop of API calls
  // This is because here we did setup the State in render Logic using setMovies(), and setting state causes re rendering
  // On every re-rendering the function fetch again and renders again and this goes on and on as an infinite loop
  // Hence we should never fetch data in render logic, instead use the useEffect() hook to handle Side effects like these (data fetching etc...)

  // --- Using useEffect() hook to handle Side Effects
  // No more Infinite Loop of Fetch and Render Logic
  // Using async Function in useEffect() hook
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          // Show Loading Icon
          setIsLoading(true);

          //Reset Error
          setError('');

          // Fetch data from the OMDB API using the given URL and API key
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          );

          // Check if fetching was successful
          if (!res.ok) {
            throw new Error('Something went Wrong!!');
          }

          // Convert the received response from fetch to Json() using.json() function
          const data = await res.json();

          // Check if the Movie Data exists in the OMDB API, if not then it wont have the data.Search property and we get undefined as response
          if (data.Response === 'False') {
            throw new Error('Movie not Found!!');
          }

          // update State
          setMovies(data.Search);
        } catch (err) {
          // Handle Error
          console.log(err.message);
          setError(err.message);
        } finally {
          //Hide Loading Icon when data arrived
          setIsLoading(false);
        }
      }
      // Reset Search Page if no search in the Search Bar
      if (query.length < 3) {
        // Delete Movies from the State if no Text to Search in the Search Bar
        setMovies([]);
        //Reset Error State & Return
        setError('');
        return;
      }
      // Calling the Function
      fetchMovies();
    },
    // Pass query prop as its used in the useEffect() Hooks code for execution of certain logic
    [query],
  );

  // Entire Structure of App visible here
  return (
    <>
      {/* 
      - Using Component Composition to avoid Prop Drilling Problem
      - Sending all the components we want inside the nav bar as children
      - This way we can directly pass the props we want in the NumResults component rather than prop drilling
       */}
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      {/* 
      - Using Component Composition to avoid Prop Drilling Problem
      - Sending all the components we want inside the Main as children
       */}
      <Main>
        {/* 
      - Using Component Composition to avoid Prop Drilling Problem
      - Sending all the components we want inside the ListBox as children
      - Hence we avoid the Prop Drilling Problem now
       */}

        {/* \
        A)
        - Passing as Children 
        - Accepting as children in the Component
        */}
        <Box>
          {/* - Conditional Rendering of Loading Icon / Movies List based on isLoading State value
           */}
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}

          {/* 
          -Conditional Rendering based on isLoading State value & also checking if there is any errors
          - '&&' Evaluates LHS expression
          - '&&' Renders RHS if the LHS is true, else if the LHS is false nothing happens 
          */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MoviesList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>

        {/* 
        B)
        - Passing as Prop
        - Accepting as element in the Component
        */}
        {/* <Box element={<MoviesList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
      </Main>
    </>
  );
}

function Loader() {
  return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>❌</span> {message}
    </p>
  );
}

// Structural Component
// Clearly Stated What all the Nav bar Includes, and if we want we can look into the individual components as well
function NavBar({ children }) {
  return <nav className='nav-bar'>{children}</nav>;
}

// --- Reusable Components
// Having 1 responsibility each Logo, SearchBar & NumResults

// Stateless / Presentational Component
function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

// Stateful Component
function SearchBar({ query, setQuery }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// Presentational Component
function NumResults({ movies = [] }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// Structural Component
function Main({ children }) {
  return <main className='main'>{children}</main>;
}

// Stateful Component
// Instead of having different boxes such as ListBox and Watched Box we created a Reusable Component Box and passed in required Components that we want to display using the Same box Component
// So instead of writing the Components separately we used a single component to display both the ListBox and WatchedBox using Component Composition

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {/* If Button is Open we show the Movie List */}
      {isOpen && children}
    </div>
  );
}

/* 
// Stateful Component
function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && children}
    </div>
  );
}
*/

/*
// Stateful Component
function WatchedBox() {
  // States
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

// Stateful Component
function MoviesList({ movies }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

// Presentational Component
function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// Presentational Component
function WatchedSummary({ watched }) {
  // Derived States based on watched state
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

// Presentational Component
function WatchedMoviesList({ watched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        // Render Each Watched Movie
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

// Presentational Component
function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
