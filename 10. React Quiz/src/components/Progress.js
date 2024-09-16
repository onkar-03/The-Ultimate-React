function Progress({ numQuestions, index, points, maxPossiblePoints, answer }) {
  return (
    <header className='progress'>
      {/* 
      - Progress bar using HTML 
      - Max is the total amount for which we want to monitor the progress
      - Value to make it controlled element so that React can handle it State
      - To make the bar progress as soon as we click an answer we update the value using index and answer conditionally
      */}
      <progress max={numQuestions} value={index + (answer !== null)}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
