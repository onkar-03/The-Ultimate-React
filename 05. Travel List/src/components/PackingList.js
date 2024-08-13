import { useState } from 'react';
import Item from './Item';

// Destructuring the items prop that contains the list of items that needs to be rendered in the UI & onDeleteItem method that has the id of the item to be deleted
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  onClearList,
}) {
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
  // .localeCompare() is used to compare 2 strings and sort them in increasing order by default
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // Sort by Packed Status
  // .slice() crates a copy of the original array, we need to do this as we dont want to modify the original array
  // using the .sort() method of arrays to sort in increasing order
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
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
