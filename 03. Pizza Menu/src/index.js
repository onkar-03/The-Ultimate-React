import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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

/* 
--- What is a Component ??
  - App Component as a Function
  - A Component is a Function that starts with an Uppercase like this: 'App' 
  - Also Components are basically Js Functions so we can write any Js code directly in the Components as soon as the Component is initialized even if we dont write a JSX
*/

/* 
--- What is JSX ?? 
    - JSX is declarative syntax means describe how UI should look like based on current data
    - Declarative means using JSX we tell React what to see on screen and not how to achieve it, Vanilla Js was imperative
    - JSX Code: Extension of Js helps us write embedded  CSS, Javascript, React Components into HTML
    - This JSX is Later converted to React.createElement() Code using Babel by create react app / vite build setups
    - We can write React without JSX but it makes the Code very hard to read etc...
*/

/*
--- Writing JavaScript inside Components 
- To write Js inside components is we use JSX we need to enter Js Mode using {} and write out Js code 
- But as we know components are Js Functions and we can write any Js inside of it as soon as they are initialized even if we dont write a JSX without the {} 
- Means if we are in JSX we need to write using Js mode via {} otherwise we can simply write out Js code as we normally do
 */

/*
--- CSS in React !!
  - Using Inline CSS in React we need to enter the Javascript mode and then create an Object to define styles
  -  1. Internal CSS
   We can declare a variable holding the style properties and then use it as an Object in JSX
   EG: style = { color: 'red', fontSize: '42px', textTransform: 'uppercase' }
       return <h1 style={style}>Fast React Pizza Co.</h1>;
  - 2. Inline CSS 
   We can directly declare an Object in JSX and then use it as an Object to write styles for React Component
   EG: return <h1 style={{ color: 'red', fontSize: '42px', textTransform: 'uppercase' }}>Hello React!!</h1>
   
  - 3. External CSS
   We can create a separate CSS file and import it in our React Component
   First Import the External CSS File at the start: import './index.css';
   Then we can use the className attribute to reference the CSS class in the JSX
   EG: 
*/

/*
 --- Props in React!!
  - Props is how we pass in data between components & in particular from parent to child components
  - They are like a communication channel between Parent & Child components
  - They are used to pass data or configuration from parent component to child component that the child component can use
  - Props are used to define how a component should look or behave
  - Props are read only (immutable) and cannot be changed by the Child components that receive them, they can only be updated by the parent component
  - Props are passed in the component definition as a JavaScript object
  - If we want to pass anything other than a String like Number, Arrays, Objects etc.. in Props we need to enter the Js mode using {}
  - Anything can be passed as props
 */

/* 
 --- Receiving Props in Child Component:
 - In the child component, you can access the props passed from the parent component using the props object
 - For using the Props passed to CHild component u need to use the JS Mode in there {}
 */

/*
--- Structure in Component
 - Data
 - Logic: Includes the JSX & Javascript code we write in Components
 - Appearance: Includes the CSS in JSX 
*/

/*
 --- Data in Component 
 - Data in Component contains the Props & State 
 - Props are the Data that are passed to the child component by the parent
 - Props are immutable, they are React's Strict Rules
 - State is the internal data that is updated by components logic
 - If we want to mutate the props we actually need the state
*/

/* 
 --- Why are Props immutable?? 
 - Props are immutable because changing props would result in changing Parent component creating side effects
 - In React components / functions need to be pure in terms of props and state
 - This allows React to make Apps Optimized, avoid bugs and make apps predictable 
*/

/* 
 --- One Way Data Flow 
 - In React the Data flows only from Parent to Child components only
 - This makes Apps easy to understand and predict 
 - Easy to Debug 
 - Increases Efficiency
 - In frameworks like Angular 2 way data flow is allowed, which makes them less efficient 
*/

/*
 --- JSX Rules
 - JSX works essentially like HTML, but we can enter "JavaScript mode" by using {} (for text or attributes)
 - We need to write something inside the {} in JSX mode that produces an output
 - We can place JavaScript expressions inside {}.
 - Examples: reference variables, create arrays or objects,[]. map(), ternary operator
 - Statements are not allowed (if/else, for, switch)
 - A pice of JSX produces at the very final level a Javascript Expression using React.createElement () etc..
 - We can place other pieces of JSX inside {}
 - We can write JSX anywhere inside a component (in if/else, assign to variables, pass it into functions)
 - A piece of JSX can only have one root element. If you need more, use <React.Fragment> (or the short < >)
*/

function App() {
  return (
    // To render multiple Components we need to Wrap them in a parent element such as:
    // 1. <div></div>
    // 2. <React.Fragment></React.Fragment>
    <div className='container'>
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
  return (
    <header className='header'>
      <h1>Fast React Pizza Co.</h1>;
    </header>
  );
}

// Menu Component
function Menu() {
  // const pizzas = [];
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {/* 
      - Calling each pizza Component Manually one by one, which can be optimized using Rendering Lists i.e to render elements such as from an array say pizzaData that we have
      - Using Props to send Data to Child Component
      - This is a one way data flow from Parent to Child 
      - For each Pizza we can use the same component and pass different values to render on the Page
      */}
      {/* <Pizza
        name='Pizza Spinaci'
        ingredients='Tomato, mozarella, spinach, and ricotta cheese'
        photoName='pizzas/spinaci.jpg'
        // String
        // price='$10.00'

        // If we want to write a Number etc.. i.e not a String then we need to enter the Js Mode
        price={10}
      />
      <Pizza
        name='Pizza Funghi'
        ingredients='Tomato, mozarella, mushrooms, and onion'
        photoName='pizzas/funghi.jpg'
        // String
        // price='$15.00'

        // If we want to write a Number we need to enter the Js Mode
        price={15}
      /> */}
      {/*Conditional rendering of pizzas if and only if there are pizza data ready
       to be displayed else short circuit using the && operator */}
      {/* EG: {numPizzas > 0 && (
        <ul className='pizzas'>
          {...} 
      */}

      {/* Using Ternary operator to do the same as with the conditional operator */}
      {numPizzas > 0 ? (
        <ul className='pizzas'>
          {/* 
      - Traversing the Whole pizzaData and rendering the Pizzas on the Page
      - Using .map() for this
      - As we need to write Js in JSX we need to enter the Js Mode {}
      - We can do this in 2 ways
      - 1. For each pizza we can pass a Pizza component with necessary properties as props in that component
      EG: {pizzaData.map((pizza) => <Pizza name='pizza.name'/> etc ...

      - 2. We pass the whole Object into the component as a prop and then take out  required properties inside the component itself
      EG: {pizzaData.map((pizza) => <Pizza pizzaObj={pizza} key={pizza.name}/>
      
      - Using foreach() wont work as inside the ul we need some JSX to return that can only happen if we have a new array possible using .map() and not forEach()
      */}
          {/* pizza refers to individual object here  */}
          {pizzaData.map((pizza) => (
            // Passing each property name one-by-one here in pizza component
            // <Pizza name={pizza.name} photoName={pizza.photoName} />

            // Passing entire Pizza Object to the Component
            // We need to pass the key its use case we will know later, but React wants to identify each list item as unique for which it needs to have a key hence we pass the key
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We are still working on our menu. Please come back later 😁</p>
      )}
    </main>
  );
}

// Pizza Component
function Pizza(props) {
  // console.log(props);
  return (
    // JSX Code: Js, CSS, React components all together in HTML Code
    <li className='pizza'>
      {/*
      - Accepting props passed in the Menu (Parent) for Pizza Component (Child)
      - For this we use an argument say 'props' 
      - And to use the Props Object and its Properties we need to enter the Js Mode '{}'
      - If the passed value is a whole Object as props then we need to Access object properties using that object name  
      */}
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  );
}

// Footer Component
function Footer() {
  // As we know Components are Js Functions and we can write any Js inside of it as soon as they are initialized even if we dont write a JSX
  const hour = new Date().getHours();
  // console.log(hours);

  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (isOpen) {
  //   alert("We're currently Open");
  // } else {
  //   alert("Sorry! We're currently Closed");
  // }

  // We can also use Js inside the JSX like this
  return (
    <footer className='footer'>
      {/*Conditional rendering of pizzas if and only if there are pizza data ready
       to be displayed else short circuit using the && operator */}
      {/* EG:  <div className='order'>
        {isOpen && (
          <p> </p>
        )}
        <button className='btn'>Order</button>
      </div>
      */}

      {/* Using Ternary operator to do the same as with the conditional operator */}
      <div className='order'>
        {isOpen ? (
          <p>
            We're currently Open until {closeHour}:00. Come visit us or order
            online!!
          </p>
        ) : (
          <p>
            We are happy to welcome u between {openHour}:00 - {closeHour}:00
          </p>
        )}
        <button className='btn'>Order</button>
      </div>
    </footer>
  );

  /*
If we dont use JSX we need to use the React.createElement() method and do the following to create the same component:

1. type: Specify the type of the element. This can be a string representing a DOM tag (such as 'div', 'span', 'h1'), or a React component (either a class or function).

2. props: Provide an object containing the properties or attributes to be passed to the element. This object can include standard HTML attributes (like className, id, style), event handlers (such as onClick, onChange), and custom properties.

3. children: Include the children of the element. Children can be a single child, multiple children, or null. They can be other React elements, strings, numbers, or an array containing a mix of these types.
*/

  // CODE:
  // return React.createElement('footer', null, 'We are currently helping');
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
