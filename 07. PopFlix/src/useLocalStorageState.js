import { useState, useEffect } from 'react';

// This Custom Hook behaves exactly like useState Hook, but stores the state in the Local Storage
// Here we accept initial State of Local Storage at any point after re rendering
// Also we accept the key string which is the name by which we want to store the movies
export function useLocalStorageState(initialState, key) {
  // Set and Read from local Storage
  const [value, setValue] = useState(function () {
    // SO now on re render react calls this callback function and returns the value of the local storage as the initial value of watched
    const storedValue = localStorage.getItem(key);
    // We need to convert the Data stored as string back using JSON.parse()
    // Also check if items exist in watched list if yes only then we parse and display something on reading from local storage
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // To Store in local Storage
  useEffect(
    function () {
      // Here we dont need to create a new array as Effect runs after the component has rendered which means the state is already updated
      localStorage.setItem(key, JSON.stringify(value));
    },
    // Wanna run it each time the watched movie is updated
    [value, key],
  );

  // Return
  return [value, setValue];
}
