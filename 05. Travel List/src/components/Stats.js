export default function Stats({ items }) {
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
