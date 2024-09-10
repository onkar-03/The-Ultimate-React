import { useState, useEffect } from 'react';

// API Key
const KEY = 'e2283e92';

// --- Important
// We generally practice default Exports of Components
// We generally practice named exports of Custom Hooks

// Extracting the Fetch Movie Data feature to a custom hook
export function useMovies(query) {
  // Placing required states for custom hook to work
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // States for Error Handling and Query
  const [error, setError] = useState('');

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
          if (err.name !== 'AbortError') {
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

  // If we use Custom Hook we need to return all the necessary things that are required in the Component where the custom hook is called
  return [movies, setMovies, isLoading, setIsLoading, error, setError];
}
