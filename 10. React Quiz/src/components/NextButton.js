function NextButton({ dispatch, answer }) {
  if (answer === null) return;
  return (
    <button
      className='btn btn-ui'
      // On clicking the button we want to update the index to + 1 to display the next question hence we use the dispatch to transfer action to the reducer function
      onClick={() => dispatch({ type: 'next-question' })}
    >
      Next
    </button>
  );
}

export default NextButton;
