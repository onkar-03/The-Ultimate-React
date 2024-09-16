import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
  // Using useEffect to display a Timer on the Screen
  useEffect(
    function () {
      const id = setInterval(function () {
        // Dispatch action tick here
        dispatch({ type: 'tick' });
      }, 1000);

      // Clean Up function to reset the Timer when it Unmounts
      return () => clearInterval(id);
    },

    // Re render on every dispatch action that re renders the PAGE
    [dispatch],
  );

  return <div className='timer'>{secondsRemaining}</div>;
}

export default Timer;
