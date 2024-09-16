export default function Options({ question, dispatch, answer }) {
  //Check if user selected an Answer
  const hasAnswered = answer !== null;

  return (
    <div className='options'>
      {/*
      - Iterate over all the Options and display them
      - Using Index of options to tally correct and wrong answers and also the current answer selected
       */}
      {question.options.map((option, index) => (
        <button
          // Conditional rendering of classes for currently selected option
          // Conditional rendering of color for the correct and wrong answers classes
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          // Disable Button after 1 Click i.e in case we have an Answer index
          disabled={answer !== null}
          // Answer is the Index of the selected option
          // Hence we pass the index of selected option to payload for updating the answer state which as null initially
          onClick={() => dispatch({ type: 'new-answer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
