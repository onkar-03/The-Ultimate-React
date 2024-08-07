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
