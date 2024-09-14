import { useReducer, useState } from 'react';

// Complex Initial State (an Object)
const initialState = { count: 0, step: 1 };

// --- Reducer Function of the useReducer Hook
// It gets access to the current state and the action that we pass in the dispatch function
// Takes in all the details about the action and the current state
// Based on action type takes in some kind of actions and returns the desired results
function reducer(state, action) {
  console.log(state, action);

  // return state + action;

  // if (action.type === 'inc') return state + 1;
  // if (action.type === 'dec') return state - 1;
  // if (action.type === 'setCount') return action.payload;

  // For different action types inputs we generally use the Switch Statement
  switch (action.type) {
    case 'dec':
      // As state is an Object, hence we destructure it first and then update the count value according to the action
      // Access property of State Object 'count' as state.count, 'step' as state.step etc...
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: +action.payload };
    case 'setStep':
      return { ...state, step: +action.payload };
    case 'reset':
      // For reset we want the initial state values
      return initialState;
    default:
      throw new Error('Invalid action');
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // --- Reducer Hook
  // Takes the initial state and also the reducer function, the initial state while using useReducer is generally a Complex State
  // Returns the updated state and the dispatch function

  // --- Dispatch Function of the useReducer Hook
  // The dispatch function is similar to the setter function of the useState Hook,
  // But in the Dispatch Function we pass in actions that we want to carry out in the reducer function
  // The dispatch Actions are primarily an Object with properties like 'type:' & optionally 'payload:' which contains the value that we want to pass in to the reducer function

  // Passing Complex State to useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructuring the Complex State returned from the useReducer Hook
  const { count, step } = state;

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
    // setCount(Number(e.target.value));

    dispatch({ type: 'setCount', payload: +e.target.value });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));

    dispatch({ type: 'setStep', payload: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);

    dispatch({ type: 'reset' });
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
