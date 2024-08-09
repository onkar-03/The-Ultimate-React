import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
];

/* 
 --- Controlled Elements In React ---

 --- Default Behavior of Input Fields

 - By default, input fields such as `<input>` and `<select>` elements maintain their own state within the DOM. This makes it challenging to read their values and manage their state effectively.
 - In React, we prefer to keep all state in a single, central place within the React application, rather than in the DOM.

 --- Controlled Elements

 - To achieve centralized state management, we use a technique called controlled elements. This means that React controls and owns the state of these input fields, not the DOM
 - Doing this helps us achieve the fact that now React controls teh States of input / select fields of the Form element

 --- Steps to Implement Controlled Elements
 1. Create a Piece of State: 
   - EG: const [description, setDescription] = useState('');

 2. Use State as Value of Input Field: 
 - Force the element to always take the Value of the State variable 
  - EG: <input type="text" value={description} />

 3. Listen for Change Event
  - EG: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
*/

/* 
 --- Understanding State and Props in React --- 

 --- What's the difference between state and props?

 --- State:
  - Internal data that is owned by the component in which it is declared.
  - Can be thought of as the component's memory because it can hold data over time, across multiple rerenders.
  - State can be updated by the component itself, which will cause the component to be rerendered by React.
  - We use this mechanism of state to make components interactive.

 --- Props:
  - External data that is owned by the parent component.
  - Can be thought of as function parameters, a communication channel between parent and child components where parents can pass data into children.
  - Props are read-only and cannot be modified by the component that is receiving them.
  - When the child component receives new updated props, it will cause the component to rerender to keep in sync with the state it received as a prop.
  - Props are used to give the parent component the ability to configure their child components, essentially seen as settings in child components which the parent component can define as they wish.

 --- Connection between State and Props:
 - Whenever a piece of state is passed as a prop, when that state updates, both the component owning the state and the component receiving the state as a prop are rerendered.

In summary, while state is used by developers to make components interactive, props are used to configure child components by passing data from parent to child.
*/

/*
--- Introduction to Thinking in React ---
- Building React applications requires a new mindset compared to vanilla JavaScript
- Learning to think in React is essential for mastering React

--- React Development Mindset ---
- It's important to understand how to use React tools such as components, state, and props
- Focus on state transitions rather than element mutations

--- Process Overview:
- Break UI into Components:
  - Identify and structure the UI components
  - Consider reusability of components
  
- Build a Static Version:
  - Create a non-interactive version of the app
  - Focus on coding the UI without worrying about state and interactivity

- State Management:
  - Decide when to use state 
  - Type of state: Local / Global 
  - Where to place each piece of state

- Data Flow:
  - Establish how data flows through the application
  - Consider one-way data flow, child-to-parent communication, and global state management
*/

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form() {
  // Implementing Controlled Elements for Select and Form elements
  // 1. Creating a Piece of State, its default value is an empty string
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Event handlers Functions
  function handleSubmit(e) {
    // To disable the reloading of page on items addition
    e.preventDefault();

    // If no Item description then do nothing
    if (!description) return;

    // Creating the New Item Object
    const newItem = { description, quantity, packed: false, id: Date.now() };

    // Rest all the Values back to Default using setter functions
    setDescription('');
    setQuantity(1);
  }

  return (
    // Rendering Form and its components
    // Listening for Submit event on the Form
    // The submit event happens when we click the add button / press Enter on keyboard
    // The handleSubmit takes the current Event and uses it in teh event handler
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 🥳 trip ??</h3>

      {/*
      - Controlled Elements Step 2 
      - 2. Using the piece of State as value of input field for Controlled Elements
      - 3. Listening for Change Event for Controlled Elements in teh input field using onChange() EventListener
      */}
      <select
        name='quantity'
        value={quantity}
        // Whenever we type in the Input field a change event is fired up
        // We handle the change using the onChange() EventHandler
        // The function receives the event and on the event we read the target that is the input element
        // e.target.value: is the text that we typed in the input field
        // e.target.value is always a string, to place it in teh state first convert it to a number using Number() / +
        onChange={(e) => setQuantity(+e.target.value)}
      >
        {/* 
        - Creating 20 options using Array.from() and .map()
        - Each number is rendered as an option value inside the select element
        - Whenever we map over a list to render it we need to give a key value to each value of the list to identify them as unique items
        */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/*
      - Controlled Elements Step 2 
      - 2. Using the piece of State as value of input field for Controlled Elements
      - 3. Listening for Change Event for Controlled Elements in teh input field using onChange() EventListener
      */}
      <input
        type='text'
        placeholder='Item...'
        value={description}
        // Whenever we type in the Input field a change event is fired up
        // We handle the change using the onChange() EventHandler
        // The function receives the event and on the event we read the target that is the input element
        // e.target.value: is the text that we typed in the input field
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type='submit'>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className='list'>
      <ul>
        {/* 
      - Rendering List using Map method for the whole items array 
      - Each item is passed as a prop to Item component
      - Destructured in the item component and used directly 
      - Whenever we map over a list to render it we need to give a key value to each value of the list to identify them as unique items
      */}
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

// Destructuring the Item received as Props then we can use the Oject directly
function Item({ item }) {
  return (
    <li>
      {/* 
      - Using Ternary Operator to set Styles
      - If item packed then we want to add style to that item else nothing to add 
      */}
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      You have X items on your list, an you already packed X(X%)
    </footer>
  );
}
