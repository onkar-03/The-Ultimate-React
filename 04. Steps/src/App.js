import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

// Root Component 'App'
// Exporting so as the index.js can use it where it is imported
export default function App() {
  // Defining State for Steps
  // As we initially want the step to be 1 hence 1 is passed as argument
  // We destructure the returned values and store it in step var and setStep function
  const [step, setStep] = useState(1);

  // Defining State for Open & CLose Tab
  // As we initially want the tab to be opened hence we set default value to true
  // Updating state using the callback function
  const [isOpen, setIsOpen] = useState(true);

  // Event Handler Functions
  // Use & Update State: As soon as the event occurs the event handler is called & the step is updated using setter function, then React re-renders the Component

  function handlePrevious() {
    if (step > 1) setStep((step) => step - 1);
  }
  function handleNext() {
    if (step < 3) setStep((step) => step + 1);
  }

  // Update isOpen state when an Event Occurs
  function handlerOpen() {
    // When tab is clicked, we toggle the isOpen state
    setIsOpen((open) => !open);
  }

  return (
    <>
      <button className='close' onClick={handlerOpen}>
        &times;
      </button>
      {/*
      - Using defined state in JSX
      - If isOpen is True only then teh steps tab renders 
      */}
      {isOpen && (
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
            - Using the reusable `Button` component to render different buttons.
            - Leveraging the `children` prop in React to make components more flexible and reusable.
            - The `Button` component is designed to accept content between its opening and closing tags.
            - This content, referred to as `children`, can include text, icons, or any other valid React nodes.
            - Unlike self-closing components (e.g., <Button />), using both opening and closing tags 
            (e.g., <Button>content</Button>) allows us to pass dynamic content that can be customized for each instance.
            - The `children` prop provides a way to make components adaptable to different contexts while keeping the core component logic consistent.
            */}
            <Button
              text='Previous'
              onClick={handlePrevious}
              textColor='#fff'
              bgColor='#7950f2'
              emoji=''
            >
              <span>👈</span>Previous
            </Button>
            <Button onClick={handleNext} textColor='#fff' bgColor='#7950f2'>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      onClick={onClick}
    >
      {/* 
       - The children refers to all the content we provided between the opening and closing brackets of the Component 
      */}
      {children}
    </button>
  );
}
