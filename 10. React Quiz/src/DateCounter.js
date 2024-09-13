import { useReducer, useState } from 'react';

// --- Reducer Function of the useReducer Hook
// It gets access to the current state and the action that we pass in the dispatch function
// Takes in all the details about the action and the current state
// Based on action type takes in some kind of actions and returns the desired results
function reducer(state, action) {
  console.log(state, action);
  // return state + action;

  if (action.type === 'inc') return state + 1;
  if (action.type === 'dec') return state - 1;
  if (action.type === 'setCount') return action.payload;
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  // --- Reducer Hook
  // Takes the initial state and also the reducer function
  // Returns the updated state and the dispatch function

  // --- Dispatch Function of the useReducer Hook
  // The dispatch function is similar to the setter function of the useState Hook,
  // But in the Dispatch Function we pass in actions that we want to carry out in the reducer function
  // The dispatch Actions are primarily an Object with properties like 'type:' & optionally 'payload:' which contains the value that we want to pass in to the reducer function
  const [count, dispatch] = useReducer(reducer, 0);

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  // date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec' });

    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: 'inc' });

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: +e.target.value });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
