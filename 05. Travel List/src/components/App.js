import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: false },
// ];

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

  // Function to Handle the Clear List Task
  function handleClearList() {
    // Alert Confirmation
    //  The window.confirm() method displays a modal dialog with a specified message and two buttons: "OK" and "Cancel"
    // If the user clicks "OK", the method returns true
    // If the user clicks "Cancel", the method returns false
    // Assign to Variable: The returned value is stored in the confirmed variable. This allows you to use confirmed later in your code to decide what to do based on the user's response.
    const confirmed = window.confirm(
      'Are you sure you want to delete all Items?',
    );

    // Reset the Items Array to an Empty Array only if user agrees to delete it from teh alert window
    if (confirmed) setItems([]);
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
        onClearList={handleClearList}
      />
      {/* 
      Passing the items Array in order to use the data to display the State
      of Items in State Component such as number of items using numItems which is a derived state depending upon the items array length
      */}
      <Stats items={items} />
    </div>
  );
}
