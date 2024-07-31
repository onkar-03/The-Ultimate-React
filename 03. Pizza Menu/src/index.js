import React from 'react';
import ReactDOM from 'react-dom/client';

// App Component
// A Component is a Function that starts with an Uppercase like this: 'App'
function App() {
  return <h1>Hello, React!</h1>;
}

// Root Element Creation using ReactDOM
// Setting up the root place for react to load at the div having the root id in it
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App Component using Strict Mode of React
// The React Strict Mode is used to render the components twice during development stage in order to find potential bugs and check if we are using outdated parts ofReact API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
