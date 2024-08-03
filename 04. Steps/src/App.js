import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

/*
 --- Event Listeners in React
 - In React, we use a more declarative approach so we do not manually select Dom elements and so therefore we do also not use add event listener
 - We do something very similar to the HTML inline event listeners. So basically we will directly listen for the event right on the element where they will happen.
 - In React, event listeners are written as attributes in JSX
 - These attributes have a prefix 'on' and are camel-cased unlike HTML, and their values are callback functions that will be called when the event occurs inside {} as we need to write in Js mode inside JSX
 - We generally write these event handlers Functions separately inside the JSX and then call them in the Event Handlers
*/

/* 
 --- State in React
 - State is the most important concept in React
 - State refers to the general condition in which a component is
 - We have already learned how to pass data to a component using props
 - State is components own data that the component holds overtime, necessary for information that it needs to hold throughout the app's cycle
 - State: Components Memory
 - Piece of State: a State variable in a component
 - Updating component state triggers React to re-render the component
*/

/*
 --- What does state do ??
 - Updates the Components View
 - Persist local variables between renders & re-renders
*/

/*
 --- Using State in React
 1. Define a State Variable
 2. Use the State variable mainly in JSX
 3. Update the State in Event Handlers
*/

// Root Component 'App'
// Exporting so as the index.js can use it where it is imported
export default function App() {
  // Defining State variable
  // It is a function & it takes an argument which is the default value of the State
  // As we initially want the step to be 1 hence 1
  // useState returns the default value and a function to update the value, hence we destructure it
  const [step, setStep] = useState(1);

  // Event Handler Functions
  // As soon as the event handler is called & the setStep is updated, then React re-renders the Component
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
          {/* Used inline CSS for buttons */}
          {/* Adding Event Listeners in JSX */}
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
