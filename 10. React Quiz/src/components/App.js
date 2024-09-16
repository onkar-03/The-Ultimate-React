import { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Loader from './Loader.js';
import Error from './Error.js';
import StartScreen from './StartScreen.js';
import Questions from './Questions.js';
// import DateCounter from './DateCounter.js';

// Initial States
//Has all the required States we need for the Application
const initialState = {
  // Initially we want the Questions to be an Empty Array
  questions: [],

  // Loading, Error, Ready, Active, Finished Status
  status: 'loading',

  // To keep tract of the current Question from the Questions Array we create a State
  index: 0,

  // Initial Answer State holding index of Answer
  // Initially there is no answer hence null
  answer: null,

  // State to store the Points of the user
  points: 0,
};

// Reducer Function to handle all States
function reducer(state, action) {
  // Switch to handle different states along with their update actions & end results
  switch (action.type) {
    case 'data-received':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'data-failed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };

    // On every new answer by user we want to update the state
    case 'new-answer':
      // Getting the current question at the current index
      const question = state.questions.at(state.index);

      // Complex State Updating Logic
      // Updating the points based on the selection of correct option otherwise the points stay the same
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error('Invalid action');
  }
}

export default function App() {
  // Nested Destructuring of Initial States
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // Derived State
  const numQuestions = questions.length;

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
      } catch (err) {
        dispatch({ type: 'data-failed' });
      }
    };

    // Calling Async Function
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {/* 
        --- Children inside the Main Component
        --- Based on Current Status we conditionally display the content on the Page
        - 1. If Status is Loading we display the Loader Component
        - 2. If Status is Error we display the Error Component
        - 3. If Status is Ready we display the StartScreen Component
        - 4. If Status is Active we display the Questions Component
        */}

        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          // Passing the dispatch function as a prop as we want it for the onClick event on the Button in StartScreen
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
