import React from 'react';
import ReactDOM from 'react-dom/client';

// Pizza Data
const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

// App Component as a Function
// A Component is a Function that starts with an Uppercase like this: 'App'
function App() {
  return (
    // To render multiple Components we need to Wrap them in a parent element such as:
    // 1. <div></div>
    // 2. <React.Fragment></React.Fragment>
    <div>
      <h1>Hello, React!</h1>
      {/* Nested Pizza Component inside App Component */}
      {/* Nesting does not mean writing one component inside another never do it */}
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}

// Pizza Component
function Pizza() {
  return (
    // To render multiple Components we need to Wrap them in a parent element such as:
    // 1. <div></div>
    // 2. <React.Fragment></React.Fragment>
    <div>
      <img src='pizzas/spinaci.jpg' alt='Spinaci Pizza' />
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>;
    </div>
  );
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
