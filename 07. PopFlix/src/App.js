import { useState, useEffect } from 'react';
import StarRating from './StarRating.js';

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
  // Listing State Up
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [watched, setWatched] = useState([]);

  // Defining watched state differently
  // Instead of using another effect to get data from local storage and set to the watched list wew can pass a callback function to the useState()
  // the useState() accepts a value / a callback function as well
  // This function needs to be pure and can have no arguments
  // Also as we know the default value of useState() is only considered on initial render hence the function will be called on initial render only i.e on initial mount / re-rendering
  const [watched, setWatched] = useState(function () {
    // SO now on re render react calls this callback function and returns the value of the local storage as the initial value of watched
    const storedValue = localStorage.getItem('watched');

    // We need to convert the Data stored as string back using JSON.parse()
    return JSON.parse(storedValue);
  });

  // States for Error Handling and Query
  const [error, setError] = useState('');

  // Lifting State Up to App from SearchBar
  const [query, setQuery] = useState('');

  // Lifting State Up to App to hold data about Selected Movie for
  const [selectedId, setSelectedId] = useState(null);

  // Handle Movie Details
  function handleSelectedMovie(id) {
    // COnditional rendering of movie details ... and close movie on clicking again on the same movie
    setSelectedId(selectedId === id ? null : id);
  }

  // Handle the Close Button, onclick we set back the id to null
  function handleCloseMovie() {
    setSelectedId(null);
  }

  // Handle the Watched Movie List
  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    // Implementing Local Storage
    // On every new Movie added to the watched list we want to store the List of movies to the Local Storage
    // As we know the State update is asynchronous, hence the newly watched movie won't be added to the list immediately
    // Therefore we again create a new array of the List adding the newly watched movie to the list
    // Convert it to String as Local Storage holds Key-Value pair where the value is a 'String'
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  // Event Handler to remove the movie from the list
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // Local Storage using useEffect()
  // Implementing the Storing of Watched List to Local Storage in the handleWatchedMovie is nice
  // But we want it to be reusable in future hence we create an Effect
  useEffect(
    function () {
      // Here we dont need to create a new array as Effect runs after the component has rendered which means the state is already updated
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    // Wanna run it each time the watched movie is updated
    [watched],
  );

  // --- Using useEffect() hook to handle Side Effects
  useEffect(
    function () {
      // Abort Controller API to handle and abort unnecessary fetch requests made during
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          // Show Loading Icon
          setIsLoading(true);

          //Reset Error
          setError('');

          // Fetch data from the OMDB API using the given URL and API key
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal },
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
          if (error.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          //Hide Loading Icon when data arrived
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query],
  );

  // Entire Structure of App visible here
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
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
function NavBar({ children }) {
  return <nav className='nav-bar'>{children}</nav>;
}

// --- Reusable Components
// Stateless / Presentational Component
function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>PopFlix</h1>
    </div>
  );
}

// Stateful Component
function SearchBar({ query, setQuery }) {
  // --- How to not select DOM Elements !!
  // We want to focus on teh Search bar on initial render
  // 1. First we select the Element the SearchBar
  // 2. Then we add focus to it
  // We do all this in teh Search Bar as it renders and executes the code on initial mount
  // Here we directly select the class of input fields like we did in Vanilla Js (Imperative Way), whereas React is Declarative
  // In declarative programming, you define what you want the UI to look like based on the current state of your application. React abstracts away the details of how to update the UI, and you just declare the desired end state.
  // In imperative programming, you provide step-by-step instructions to the computer on how to perform a task. When working with the DOM directly in JavaScript, you manipulate elements explicitly.
  // Hence this is not the Ideal way to do it... we use refs instead
  useEffect(function () {
    const el = document.querySelector('.search');
    console.log(el);

    el.focus();
  }, []);
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

// Stateful Component
function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className='list list-movies'>
      {movies.slice(0, 6)?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

// Presentational Component
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
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

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  // State to store the Movie data to display selected data from the Object on Screen
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  // Checking if the array already has the movie listed in it, if yes we cant rate the movie again
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  // Destructuring the JSON Object of Movie Data
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Director: director,
    imdbRating,
    Plot: plot,
    Genre: genre,
    Actors: actors,
    Released: released,
  } = movie;

  // --- Breaking Hooks Rules (Practice)
  // But as es-lint wont let us do so hence we disable it first
  // /* eslint-disable */ (Uncomment to disable es-lint)

  // if (imdbRating > 8) {
  //   const [isTop, setIsTop] = useState(true);
  // }

  // Explanation:
  // Now if we click to get movie details of a movie that has an IMDb rating > 8 we get an error saying:
  // ERROR: React has detected a change in the order of Hooks called by MovieDetails. This will lead to bugs and errors if not fixed and a chart something like this
  //  Previous render            Next render
  //    ------------------------------------------------------
  // 1. useState                   useState
  // 2. useState                   useState
  // 3. useState                   useState
  // 4. useEffect                  useState
  //    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // if (imdbRating > 8) return <p>Greatest Ever !!</p>;

  // Explanation:
  // Here too we did early return and displayed some text when the Rating was > 8
  // Hence the Effect Hooks after this aren't executed and we get an Error saying:
  // ERROR: Rendered fewer hooks than expected. This may be caused by an accidental early return statement

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: +imdbRating,
      runtime: +runtime.split('').at(0),
      userRating,
    };

    // Placing the newly watched movie to the list
    onAddWatched(newWatchedMovie);

    // Close the Movie and display the List
    onCloseMovie();
  }

  // Side Effect Handling for Data Fetching from the API and rendering movies on Screen
  useEffect(
    function () {
      // Display Loading
      setIsLoading(true);

      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        );
        const data = await res.json();

        // Setting the Object as Object
        setMovie(data);

        // Set back Loading State
        setIsLoading(false);
      }
      getMovieDetails();
    },

    // We want to run the Effect whenever the Id changes
    [selectedId],
  );

  // Side Effects Handling of Changing the Page title whenever we click on a Movie in the List
  useEffect(
    function () {
      // In case no movie selected show the default title
      if (!title) return;
      document.title = `Movie | ${title} | PopFlix`;

      // CLeanUp Function to reset side Effects
      return function () {
        document.title = 'PopFlix';
      };
    },
    // We wan the Title to re-render on change of title name while clicking on multiple movies
    [title],
  );

  // Side Effect to enable Esc keystroke for going back
  useEffect(function () {
    function callback(e) {
      // Call CloseMovie only if the key is Escape
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }

    // Add the Event Listener on the Document for keypress
    document.addEventListener('keydown', callback);

    // Cleanup Function
    return function () {
      document.removeEventListener('keydown', callback);
    };
  }, []);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released}&bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {isWatched ? (
                `You already rated this Movie ${watchedUserRating} ⭐`
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  <button className='btn-add' onClick={handleAdd}>
                    ++ Add to List
                  </button>
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

// Presentational Component
function WatchedSummary({ watched }) {
  // Derived States based on watched state
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating),
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating),
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);

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
          <span>⭐</span>
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
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        // Render Each Watched Movie
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

// Presentational Component
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className='btn-delete'
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          -
        </button>
      </div>
    </li>
  );
}
