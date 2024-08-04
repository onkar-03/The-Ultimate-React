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
--- What is a Component in React? ---

  - A React Component is essentially a JavaScript function or class that returns JSX (or React elements).
  - Components are named with an uppercase first letter, such as `App`. This convention differentiates them from regular HTML elements and allows React to treat them as custom components.
  - Components can be written as functions (Functional Components) or classes (Class Components). With the introduction of React Hooks, Functional Components are now commonly used for most cases.
  - As JavaScript functions, components can include any JavaScript code, such as logic, calculations, or state management, and they do not necessarily need to return JSX.
  - While components typically return JSX to describe what the UI should look like, they can also return `null` or other values based on logic
*/

/* 
--- What is JSX? ---

  - JSX (JavaScript XML) is a declarative syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.
  - Declarative syntax means JSX describes what the UI should look like based on the current data, rather than specifying the steps to achieve that UI. This contrasts with imperative programming, where you manually dictate each step.
  - JSX enables you to embed HTML, CSS, and JavaScript directly within your components, making it easier to write and understand UI code.
  - JSX code is not valid JavaScript by itself. It needs to be transformed into standard JavaScript using a compiler like Babel. For example, JSX is converted into `React.createElement()` calls, which create the corresponding React elements.
  - While it is possible to write React components without JSX by using `React.createElement()` directly, JSX provides a more readable and expressive way to define the component structure.
  - JSX is used within React components to define what the component should render.
*/

/* 
--- Writing JavaScript Inside Components ---

  - In React components, you can write JavaScript code within JSX by using curly braces `{}`. This allows you to embed JavaScript expressions directly into the JSX.
  - JavaScript expressions inside curly braces `{}` can include variables, functions, calculations, and other expressions that you want to include in the rendered output.
  - For example, to display a variable's value in JSX, you would use `{variableName}` within the JSX code.
*/

/* 
--- CSS in React ---

  - **Inline CSS**:
    To use inline CSS in React, you enter JavaScript mode using curly braces `{}` and define styles as a JavaScript object. 
    This object can then be used in the `style` attribute of an element. The style properties should be camel-cased.
    
    Example:
    import React from 'react';

    function App() {
      const style = { color: 'red', fontSize: '42px', textTransform: 'uppercase' };

      return <h1 style={style}>Fast React Pizza Co.</h1>;
    }

  - **Internal CSS**:
    You can define styles as a JavaScript object within the component and use it directly in JSX.
    This approach is useful for small or component-specific styles that do not need to be reused.
    
    Example:
    import React from 'react';

    function App() {
      return (
        <h1 style={{ color: 'red', fontSize: '42px', textTransform: 'uppercase' }}>
          Hello React!!
        </h1>
      );
    }


  - **External CSS**:
    To use external CSS, create a separate `.css` file with your styles and import it into your React component. You then use the `className` attribute to apply the styles to elements. This method is ideal for larger projects or shared styles.
    
    Example:
    --- index.css
    .heading {
      color: red;
      font-size: 42px;
      text-transform: uppercase;
    }

    import './index.css';  // Import the external CSS file
    function App() {
      return <h1 className="heading">Fast React Pizza Co.</h1>;
    }

  Summary:
  - **Inline CSS**: Use JavaScript objects with camel-cased properties directly in the `style` attribute.
  - **Internal CSS**: Define style objects within the component and apply them inline.
  - **External CSS**: Create and import separate CSS files and use `className` to apply styles.

  Each method has its use cases, and the choice depends on factors such as the scope of styles, maintainability, and project size.
*/

/* 
--- Props in React ---

  - **Props** (short for properties) are a mechanism for passing data and configuration from parent components to child components in React.
  - They act as a communication channel between parent and child components, allowing you to pass information down the component tree.
  - Props are used to define how a component should look or behave based on the data or configuration provided by the parent.
  - Props are **read-only** and **immutable**, meaning they cannot be modified by the child components that receive them. Any changes to props must be made by the parent component.
  - Props are passed to a component as a JavaScript object and can include various types of data, such as strings, numbers, arrays, objects, and functions.
  - When passing non-string values (like numbers, arrays, or objects) in props, you need to use curly braces `{}` to enter JavaScript mode.
*/

/* 
--- Receiving Props in Child Component ---

  - Accessing Props: In a child component, you access the props passed from the parent component using the `props` object. This object contains all the properties passed to the child component.

  - JSX Mode: To use the props within JSX, you need to enter JavaScript mode by using curly braces `{}`. This allows you to embed the props directly within the JSX code.
*/

/*
--- Structure in Component
- Data: The data held within a component, including props and state.
- Logic: The combination of JSX and JavaScript code written within components to handle the component's functionality.
- Appearance: The HTML, CSS, and JavaScript code that defines the visual presentation and structure of the component in JSX.
*/

/*
--- Data in Component
- Data in Component: Includes both props and state.
- Props: Data passed to a child component from a parent component.
- State: Internal data that a component manages and updates through its logic.
- Mutability: Props are immutable, meaning they cannot be changed by the child component; state is used for mutable data.
*/

/*
--- Why are Props Immutable?
- Immutability: Props are immutable to prevent unintended side effects from changing parent component data.
- Component Purity: Ensures components are pure and predictable, leading to better optimization and fewer bugs.
- App Consistency: Immutability helps maintain predictable data flow and component behavior.
*/

/*
--- One Way Data Flow
- Data Flow: In React, data flows exclusively from parent components to child components.
- Advantages: This approach makes the application easier to understand, debug, and maintain.
- Efficiency: One-way data flow contributes to the efficiency and simplicity of React applications compared to frameworks with two-way data binding.
*/

/*
--- JSX Rules
- JSX Syntax: JSX is similar to HTML but allows embedding JavaScript expressions using curly braces `{}`.
- Expressions: JavaScript expressions within `{}` can include variables, arrays, objects, and functions.
- Statements: Statements like `if/else`, `for`, and `switch` are not permitted directly within JSX.
- Single Root Element: Each JSX element must have a single root element. Use `<React.Fragment>` or the shorthand `<> </>` for multiple elements.
*/

/*
--- Destructuring Props
- Destructuring: Props can be destructured in the function parameters for easier access.
- Naming: Ensure that the destructured variable names match the names used when passing the props to the component.
*/

/*
--- React Fragments
- Purpose: Use React Fragments to group multiple elements without adding extra nodes to the DOM.
- Syntax: Enclose multiple elements within `<> </>` or `<React.Fragment></React.Fragment>`.
- Benefits: Avoids layout issues and extra wrapper elements that can affect styling.
*/

/*
--- Key Points
- Inside a Component we can write any JavaScript we want 
- Inside a JSX we can only write Js Expressions and not Statements 
- Expressions is any valid unit of code that resolves to a value
- A statement is an instruction that performs an action
- Prefer using the Ternary Operator (condition ? true : false;) for conditional rendering
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
        // Using React Fragment when we want to render more than 1 parent element in JSX
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven. all organic. all delicious.
          </p>
          <ul className='pizzas'>
            {/* 
      --- Rendering Lists
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
        </>
      ) : (
        <p>We are still working on our menu. Please come back later 😁</p>
      )}
    </main>
  );
}

// Pizza Component
// Destructuring props passed using the same name as we used in while passing them in the component rendering time
function Pizza({ pizzaObj }) {
  // console.log(props);

  // Multiple Returns are valid in a component
  // Also as we are in a component we can write any Js code we want
  // if (pizzaObj.soldOut) return null;

  return (
    // JSX Code: Js, CSS, React components all together in HTML Code

    // Conditionally rendering class names for sold-out pizzas
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''} `}>
      {/*
      - Accepting props passed in the Menu (Parent) for Pizza Component (Child)
      - For this we use an argument say 'props' 
      - And to use the Props Object and its Properties we need to enter the Js Mode '{}'
      - If the passed value is a whole Object as props then we need to Access object properties using that object name  
      */}
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/* // Conditionally rendering Text on page*/}
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
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
          <Order closeHour={closeHour} openHour={openHour} />
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

// Order Component
// Destructuring props passed using the same name as we used in while passing them in the component rendering time
function Order({ closeHour, openHour }) {
  return (
    <p>
      We're currently Open from {openHour}:00 am - {closeHour}:00 pm. Come visit
      us or order online!!
    </p>
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
