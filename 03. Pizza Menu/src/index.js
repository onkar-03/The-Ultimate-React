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
// Also Components are basically Js Functions so we can write any Js code directly in teh Components as soon as the Component is initialized even if we dont write a JSX
function App() {
  return (
    /* 
    What is JSX ?? 
    - JSX is declarative syntax means describe how UI should look like based on current data
    - Declarative means using JSX we tell React what to see on screen and not how to achieve it, Vanilla Js was imperative
    - JSX Code: Extension of Js helps us write embedded  CSS, Js React Components into HTML
    - This JSX is Later converted to React.createElement() Code using Babel by create react app / vite build setups
    - We can write React without JSX but it makes the Code very hard to read etc...
    */

    // To render multiple Components we need to Wrap them in a parent element such as:
    // 1. <div></div>
    // 2. <React.Fragment></React.Fragment>
    <div>
      {/* Nested Pizza Component inside App Component */}
      {/* Nesting does not mean writing one component inside another never do it */}
      {/* Header Component to Display Name  */}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return <h1>Fast React Pizza Co.</h1>;
}

// Menu Component
function Menu() {
  return (
    <div>
      <h2>Our Menu</h2>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}

// Footer Component
function Footer() {
  // As we know Components are Js Functions and we can write any Js inside of it as soon as they are initialized even if we dont write a JSX
  const hours = new Date().getHours();
  // console.log(hours);

  const openHour = 12;
  const closeHour = 24;
  const isOpen = hours >= openHour && hours <= closeHour;
  console.log(isOpen);

  // if (isOpen) {
  //   alert("We're currently Open");
  // } else {
  //   alert("Sorry! We're currently Closed");
  // }

  // We can also use Js inside the JSX like this
  return <footer>{new Date().toLocaleTimeString()}We're currently Open</footer>;

  /*
If we dont use JSX we need to use the React.createElement() method and do the following to create the same component:

1. type: Specify the type of the element. This can be a string representing a DOM tag (such as 'div', 'span', 'h1'), or a React component (either a class or function).

2. props: Provide an object containing the properties or attributes to be passed to the element. This object can include standard HTML attributes (like className, id, style), event handlers (such as onClick, onChange), and custom properties.

3. children: Include the children of the element. Children can be a single child, multiple children, or null. They can be other React elements, strings, numbers, or an array containing a mix of these types.
*/
  // return React.createElement('footer', null, 'We are currently helping');
}

// Pizza Component
function Pizza() {
  return (
    // JSX Code: Js, CSS, React components all together in HTML Code
    <div>
      <img src='pizzas/spinaci.jpg' alt='Spinaci Pizza' />
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
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
