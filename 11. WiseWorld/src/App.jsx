// Importing Components that react router gives us to define routes for different components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing all Pages we want to route to different paths
import HomePage from './pages/HomePage.jsx';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    // Declarative way to define routes using the Components the react router gives us
    <BrowserRouter>
      <Routes>
        {/* 
        - In Route we define the Path and a Component we want to load for that
        particular path using path='' and element={} in there
        - path='/' is defined for root Page i.e. the Pge to be loaded at the Start of the App 
        */}
        <Route path='/' element={<HomePage />} />
        <Route path='product' element={<Product />} />
        <Route path='app' element={<AppLayout />} />
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
