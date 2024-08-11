import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
];

// App Component
export default function App() {
  // 1. Creating a Piece of State to handle the Items list
  // Default items list must be empty at the start hence we use an empty array [], or we can pass te default values too if we want i.e. the initialItems
  const [items, setItems] = useState([]);

  //Event Handler for adding Items to the List
  function handleAddItems(item) {
    // --- Updating Items without Mutating the Original Array
    // We can't mutate the Original value in React
    // As we dont want to mutate the original array, hence we create a new array and then destructure the elements of the old array and add the new item along with the rest of them
    setItems((items) => [...items, item]);
  }

  // Function to delete Items from the list
  // To know which item to delete we must know the id of the item in the list
  function handleDeleteItems(id) {
    // --- Updating Items without Mutating the Original Array
    // We can't mutate the Original value in React
    // As we dont want to mutate the original array, hence we create a new array and then destructure the elements of the old array and add the items that are not equal to the item to be deleted along with the rest of them
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Function to Toggle the Check mark of the items
  function handleToggleItems(id) {
    // --- Updating Items without Mutating the Original Array
    // We can't mutate the Original value in React
    // As we dont want to mutate the original array, hence we create a new array and then destructure the elements of the old array and add the items with the updated packed status along with the rest of them
    // If the Item is same as what we want to mark as packed in the UI then we create a new Object of the item and set the packed value to the opposite of what it was ... if previous value packed: false, then we make it packed:true
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className='app'>
      <Logo />
      {/* As we require the handlerItems handler in the Form Component hence we pass it as a prop in the Form component */}
      <Form onAddItems={handleAddItems} />
      {/*
       - As we require the items in the PackingList Component hence we pass it as a prop in the PackingList Component 
       - Passing the delete items as a prop in the PackingList Component to delete the item when we click the cross icon
      */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItems}
      />
      {/* 
      Passing the items Array in order to use the data to display the State
      of Items in State Component such as number of items using numItems which is a derived state depending upon the items array length
      */}
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

// Destructuring the onAddItems prop that contains the handleAddItems method to add new items to already existing items array
function Form({ onAddItems }) {
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

// Destructuring the items prop that contains the list of items that needs to be rendered in the UI & onDeleteItem method that has the id of the item to be deleted
function PackingList({ items, onDeleteItem, onToggleItems }) {
  // Controlled Element
  // Default sorting set to input type
  const [sortBy, setSortBy] = useState('input');

  // Derived State
  // Using the derived state to render the items according to the criteria chosen by the user
  // Here we create a new array from existing items and hence we use derived state
  let sortedItems;

  // Sort by Input
  if (sortBy === 'input') sortedItems = items;

  // Sort by Description
  // .slice() crates a copy of the original array, we need to do this as we dont want to modify the original array
  // using the .sort() method of arrays to sort in increasing order
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // Sort by Packed Status
  // As packed is a boolean value we convert it from boolean to number using Number() / +
  if (sortBy === 'packed')
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);

  return (
    <div className='list'>
      <ul>
        {/* 
      - Rendering Items List using Map method for the whole items array 
      - Each item is passed as a prop to Item component
      - Destructured in the item component and used directly 
      - Whenever we map over a list to render it we need to give a key value to each value of the list to identify them as unique items\
      - Using State lifting method to pass the onDeleteItem method to the child component i.e. the Item
      */}
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      {/* 
      - Can be a separate component as well but here we create it inside the
      packing list only 
      */}
      <div className='actions'>
        {/*
          - Implementing a controlled select element where the `value` is tied to component state (`sortBy`).
          - On change, the state is updated with the selected option, triggering a re-render to reflect the user's choice.
        */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by Input Order</option>
          <option value='description'>Sort by Description</option>
          <option value='packed'>Sort by Packed Status</option>
        </select>
      </div>
    </div>
  );
}

// Destructuring the Item received as Props then we can use the Oject directly
function Item({ item, onDeleteItem, onToggleItems }) {
  // The onDeleteItem passed from APP -> PackingList -> Item to be used here using State Lifting Technique
  // The onToggleItem passed from APP -> PackingList -> Item to be used here using State Lifting Technique
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => {
          // --- Child to Parent Communication (Child Updates Parent State)
          // -  We need to call the event with the item id only and not the Object hence we pass in the item.id
          // - Also as we want the react to call the function when event happens we can not directly call te function as onDeleteItem(item.id) rather as a callback function like () => onDeleteItem(item.id)
          onToggleItems(item.id);
        }}
      />
      {/* 
      - Using Ternary Operator to set Styles
      - If item packed then we want to add style to that item else nothing to add 
      */}
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      {/*
      --- Child to Parent Communication (Child Updates Parent State)
      -  We need to call the event with the item id only and not the Object hence
      we pass in the item.id 
      - Also as we want the react to call the function when event happens we can not directly call te function as onDeleteItem(item.id) rather as a callback function like () => onDeleteItem(item.id)
      */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // If no items then we don't have to perform any calculations we just need to display this message
  if (items.length === 0)
    return (
      <footer className='stats'>
        {' '}
        Start adding some Items to your List !!
      </footer>
    );

  // If List isn't Empty
  // Derived States
  const numItems = items.length;
  const numItemsPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((numItemsPacked / numItems) * 100);

  return (
    <footer className='stats'>
      {percentage === 100
        ? 'You got everything! Ready to go.'
        : // Using the Derived State to display the required Information in the UI
          `You have ${numItems} items on your list, an you already packed 
      ${numItemsPacked} (${percentage}%)`}
    </footer>
  );
}
