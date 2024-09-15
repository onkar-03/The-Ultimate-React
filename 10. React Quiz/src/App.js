import { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Main from './Main.js';
// import DateCounter from './DateCounter.js';

// Initial State
const initialState = {
  //Initial state is an empty questions array
  question: [],

  // Loading, Error, Ready, Active, Finished
  status: 'Loading',
};

// Reducer Function
function reducer(state, action) {
  // Switch to handle different reducer states
  switch (action.type) {
    case 'data-received':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'data-failed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Invalid action');
  }
}

export default function App() {
  // State
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load API Data
  useEffect(function () {
    // Async Data Fetching
    const fetchData = async function () {
      try {
        // Fetch API Data
        const res = await fetch('http://localhost:9000/questions');

        // Convert Data to JSON i.e. Javascript Object
        const data = await res.json();

        // Dispatch
        // Pass the Data received from API to the reducer function
        dispatch({ type: 'data-received', payload: data });

        // Change Status to Ready
        // dispatch({ type: 'status-change', payload: 'Ready' });
      } catch (err) {
        console.error(err.message);
      }
    };

    // Calling Async Function
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
