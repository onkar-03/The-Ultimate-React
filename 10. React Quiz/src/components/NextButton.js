function NextButton({ dispatch, answer, index, numQuestions }) {
  // If the answer is null, we don't render anything.
  if (answer === null) return null;

  // We want to display the Next Button to go to the next question if there are questions left to display, otherwise we change the status to finished as the user completed the Quiz.
  if (index < numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        // On clicking the button we want to update the index to +1 to display the next question, hence we use dispatch to transfer action to the reducer function.
        onClick={() => dispatch({ type: 'next-question' })}
      >
        Next
      </button>
    );
  }

  // At last Question
  if (index === numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        // If the user has answered all questions, we change the status to finished
        onClick={() => dispatch({ type: 'finished' })}
      >
        Finish
      </button>
    );
  }

  // If the user has answered the last question, we don't render the Next button.
  return null;
}

export default NextButton;
