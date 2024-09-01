import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/*
    - Passing Max Stars Rating we want inside the Component 
    - In case no value passed we have assigned a predefined default value for stars in the Component
    -  Using Props as Components API to provide flexibility to the Component
    */}
    {/* <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
    <StarRating maxRating={10} color='pink' size={24} defaultRating={3} /> */}
  </React.StrictMode>,
);
