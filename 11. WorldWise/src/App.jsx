// Importing 3RD Party Libraries
// Importing Components that react router gives us to define routes for different components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext.jsx';

// Importing all Pages we want to route to different paths
import HomePage from './pages/HomePage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';

function App() {
  return (
    <CitiesProvider>
      {/*  Declarative way to define routes using the Components the react router
      gives us */}
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
          - When none of the Sub Routes match we display the Index Route the default one using 'index'
          - Passing the fetched data from API as props 'cities' & 'isLoading'
          - To display the Nested Routes we use the <Outlet/> component provided by the react router
          - We want to display the Nested Routes in Sidebar hence we use the <Outlet/> component there
          - To enable default loading of cities Component on Navigating to /cities we use the Navigate to describe default navigation to cities on loading /app
          - replace used to enable or disable users to navigate back to previous pages
          */}
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList />} />

            {/*
          - Using Params with React Router (Storing info in URL)
          - To implement Dynamic Routes with URL parameter we need 3 Steps
          -  1. Create a Route
          -  2. Link to that Route
          -  3. Read the state in that Route from the URL
          */}

            {/* 
          - STEP 1: 
          - Creating a brand new Route 
          - Here we specify the name of the param adn the component to Link to
          - Here the parameter we want for the URL is the id of cities
          - /:id her the parameter name we gave is the id, whatever is after the : is the name of the parameter we are passing in
          - So whenever the url takes the same fo cities/id that depicts the city id it renders the City component
          - We linked the route to City Component
          */}
            <Route path='cities/:id' element={<City />} />

            {/* 
          - STEP 2: Link to the URL in the Route that we created
          - As we want to do it for each of the List Items hence we Link to the Route URL in the CityItem Component
          
          - STEP 3: Then in the Route we read the State from the URL 
          - We do that in the City Component
          */}
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='pricing' element={<Pricing />} />

          {/* 
        - path='*' catches all the route paths that dont match any of the defined paths and displays the required PageNotFound Component 
        */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
