import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

/* 
 --- Event Listeners in React ---
 
 - In React, we use a declarative approach to handle events, so we do not manually select DOM elements or use `addEventListener`.
 - Instead, we handle events directly in the JSX, similar to how we use inline event listeners in HTML.
 - Event listeners in React are specified as attributes in JSX.
 - These attributes use the prefix `on` and are camel-cased (e.g., `onClick`, `onChange`), unlike HTML where attributes are lowercase and hyphenated (e.g., `onclick`, `onchange`).
 - The values of these attributes are callback functions that are called when the event occurs. These callback functions are specified inside curly braces `{}` to indicate that they are JavaScript expressions.
 - Event handler functions are often defined separately and then referenced in the JSX.

 Example:
 import React, { useState } from 'react';

 function ExampleComponent() {
   const [count, setCount] = useState(0);

   --- Event handler function
   const handleClick = () => {
     setCount(count + 1);
   };

   return (
     <div>
       <p>You clicked {count} times</p>
       <button onClick={handleClick}>Click me</button>
     </div>
   );
 }
*/

/* 
 --- State in React ---
 
 - State is one of the most important concepts in React.
 - State refers to the general condition or situation in which a component exists.
 - While props are used to pass data to a component from a parent component, state is data that is managed within the component itself.
 - State represents the component's own data that changes over time and is necessary for the component to function properly throughout its lifecycle.
 - State can be thought of as the component's memory.
 - A piece of state refers to an individual state variable within a component.
 - Updating the state of a component triggers React to re-render that component, ensuring the UI is in sync with the current state.
 
 Summary:
 - State is managed within the component and changes over time.
 - Props are used to pass data from parent to child components, while state is local to the component.
 - State updates trigger re-renders, allowing React to update the UI to reflect the latest state.
*/

/*
 --- What does state do ?? ---
 - Updates the Components View
 - Persist local variables between renders & re-renders
*/

/*
 --- Using State in React ---
 1. Define a State Variable
 2. Use the State variable mainly in JSX
 3. Update the State in Event Handlers
*/

/* 
 --- useState() in React ---
 
 - The `useState` is a React Hook, and all React hooks have a prefix 'use'.
 - It is a function that takes one argument: the initial state value.
 - `useState` returns an array with two elements: the current state (initialized to the provided default value) and a setter function to update the state.
 - The setter function updates the current state value without mutating it.
 - Always use the setter function to update the state and trigger re-renders of React components. Never manually update the state variable directly.
 - State updates are scheduled, meaning the new state value will be available on the next render.
 
 Example:
 const [count, setCount] = useState(0);
 - `count` is the current state value, initially set to 0.
 - `setCount` is the setter function used to update the `count` state.
 - Calling `setCount(newCount)` will update the `count` state and trigger a re-render with the new state.
*/

/*
 --- Mechanics of State in React ---
 - The Setter Function updates the current state value without mutating it.
 - When an event occurs, the event handler is called, which uses the Setter Function to update the state.
 - React does not directly modify the current state; instead, it creates a new state value and triggers a re-render with this new state.
 - This means React calls the component function again (e.g., `App()`) to render the new state.
 - When we use the Setter Function inside the event handler, it updates the current state, State update triggers a re-render causing React to re-render the entire component with the updated state, eventually updating the DOM tree.
*/

// Root Component 'App'
// Exporting so as the index.js can use it where it is imported
export default function App() {
  // Defining State variable
  // As we initially want the step to be 1 hence 1 is passed as argument
  // We destructure the returned values and store it in step var and setStep function
  const [step, setStep] = useState(1);

  // Event Handler Functions
  // Use & Update State: As soon as the event occurs the event handler is called & the step is updated using setter function, then React re-renders the Component
  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }
  function handleNext() {
    if (step < 3) setStep(step + 1);
  }

  return (
    <>
      <div className='steps'>
        <div className='numbers'>
          {/* Conditional rendering of active class based on current step */}
          {/* Using the 'step' state variable */}
          <div className={step >= 1 ? 'active' : ''}>1</div>
          <div className={step >= 2 ? 'active' : ''}>2</div>
          <div className={step >= 3 ? 'active' : ''}>3</div>
        </div>

        <p className='message'>
          {/* Displaying the step & message of the current Step */}
          {/* As the Array indexing starts from 0 hence we did step - 1 */}
          Step {step}: {messages[step - 1]}
        </p>

        <div className='buttons'>
          {/* 
          - Used inline CSS for buttons
          - Adding Event Listeners in JSX
          - Called the Event Handlers when an Event occurs
          */}
          <button
            style={{ backgroundColor: '#7950f2', color: '#fff' }}
            onClick={handlePrevious}
          >
            Prev
          </button>
          <button
            style={{ backgroundColor: '#7950f2', color: '#fff' }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
