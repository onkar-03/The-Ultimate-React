import { useState } from 'react';

// Destructuring the onAddItems prop that contains the handleAddItems method to add new items to already existing items array
export default function Form({ onAddItems }) {
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

    // Inverse Data Flow
    // Updating the State of the Parent using the Setter function passed to the child is called inverse data flow
    // Add the new Item to the List
    onAddItems(newItem);

    // Rest all the Values back to Default using setter functions
    setDescription('');
    setQuantity(1);
  }

  return (
    // Rendering Form and its components
    // Listening for Submit event on the Form
    // The submit event happens when we click the add button / press Enter on keyboard
    // The handleSubmit takes the current Event and uses it in the event handler
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 🥳 trip ??</h3>

      {/*
      - Controlled Elements Step 2 
      - 2. Using the piece of State as value of input field for Controlled Elements
      - 3. Listening for Change Event for Controlled Elements in the input field using onChange() EventListener
      */}
      <select
        name='quantity'
        value={quantity}
        // Whenever we type in the Input field a change event is fired up
        // We handle the change using the onChange() EventHandler
        // The function receives the event and on the event we read the target that is the input element
        // e.target.value: is the text that we typed in the input field
        // e.target.value is always a string, to place it in the state first convert it to a number using Number() / +
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
      - 3. Listening for Change Event for Controlled Elements in the input field using onChange() EventListener
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
