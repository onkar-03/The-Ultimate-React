// Destructuring the Item received as Props then we can use the Oject directly
export default function Item({ item, onDeleteItem, onToggleItems }) {
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
