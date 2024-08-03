// Root Component 'App'
// Exporting so as the index.js can use it where it is imported

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  // Current Step
  const step = 1;

  // Event Handler Functions
  function handlePrevious() {
    alert('Previous');
  }
  function handleNext() {
    alert('Next');
  }

  return (
    <>
      <div className='steps'>
        <div className='numbers'>
          {/* Conditional rendering of active class based on current step */}
          <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        <p className='message'>
          {/* Displaying the step & message of the current Step */}
          {/* As the Array indexing starts from 0 hence we did step - 1 */}
          Step {step}: {messages[step - 1]}
        </p>

        {/* Used inline CSS for buttons */}
        <div className='buttons'>
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
