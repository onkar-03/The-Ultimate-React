// Importing Components that react router gives us to define routes for different components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Importing all Pages we want to route to different paths
import HomePage from './pages/HomePage.jsx';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login.jsx';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList.jsx';

const URL = 'http://localhost:9000/cities';

function App() {
  //States to hold Data
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  // As we need the Fake JSON data across multiple components we declare it here so that we can pass it as props later in different components
  // Fetching the Data
  useEffect(
    function () {
      // Wrapping the fetch call in a try-catch block to handle any potential errors
      try {
        setIsLoading(true); // Start loading before the fetch operation begins

        // Defining an async function to fetch the list of cities
        async function fetchCitiesList() {
          try {
            // Fetch Data with the Fake JSON URL
            const res = await fetch(URL);

            // Checking if the response is okay
            if (!res.ok) {
              throw new Error('Failed to fetch'); // Throw an error if the response status is not OK
            }

            const data = await res.json(); // Parse the response to JSON
            setCities(data); // Update the state with the fetched data
            console.log(data); // Log the data to the console for debugging
          } catch (err) {
            console.error(err); // Log any errors encountered during the fetch
            alert('Failed to fetch cities data'); // Show an alert if data fetching fails
          } finally {
            setIsLoading(false); // Set loading state to false after fetch completes (success or failure)
          }
        }

        // Call the async function to initiate data fetching
        fetchCitiesList();
      } catch (err) {
        console.error(err); // Log any errors that occur outside of the fetchCitiesList function
      }
    },
    // Fetch Data on mount initially
    [],
  );

  return (
    // Declarative way to define routes using the Components the react router gives us
    <BrowserRouter>
      <Routes>
        {/* 
        - In Route we define the Path and a Component we want to load for that
        particular path using path='' and element={} in there
        - path='/' is defined for root Page i.e. the Pge to be loaded at the Start of the App 
        */}
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={<HomePage />} />
        <Route path='product' element={<Product />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          {/* Nested Routes */}

          {/* 
          - Default Index Route
          - When none of the Sub Routes match we display the Index Route the default one
          - Passing teh fetched data from API as props
          */}
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path='countries' element={<p>Countries</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='pricing' element={<Pricing />} />

        {/* 
        - path='*' catches all the route paths that dont match any of the defined paths and displays the required PageNotFound Component 
        */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
