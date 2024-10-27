import { createContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:9000';

// The name of the var is Capitalized because its a Component name
const CitiesContext = createContext();

// Provider Component that provides the Context
// Moved all the State Logic and Updating Things to the Provider Component
const CitiesProvider = ({ children }) => {
  //States to hold Data
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // As we need the Fake JSON data across multiple components we declare it here so that we can pass it as props later in different components
  // Fetching the Data
  useEffect(
    function () {
      // Start loading before the fetch operation begins
      setIsLoading(true);

      // Defining an async function to fetch the list of cities
      async function fetchCitiesList() {
        try {
          // Display the Loading State
          setIsLoading(true);

          // Fetch Data with the Fake JSON URL
          const res = await fetch(`${BASE_URL}/cities`);

          // Checking if the response is okay
          if (!res.ok) {
            throw new Error('Failed to fetch'); // Throw an error if the response status is not OK
          }

          const data = await res.json(); // Parse the response to JSON

          // Update the state with the fetched data
          setCities(data);

          // Log the data to the console for debugging
          console.log(data);
        } catch (err) {
          // Log any errors encountered during the fetch
          console.error(err);

          // Show an alert if data fetching fails
          alert('Failed to fetch cities data');
        } finally {
          // Set loading state to false after fetch completes (success or failure)
          setIsLoading(false);
        }
      }

      // Call the async function to initiate data fetching
      fetchCitiesList();
    },
    // Fetch Data on mount initially
    [],
  );

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
};

// Export both the Context and the Provider Component for use in other components.
export { CitiesContext, CitiesProvider };
