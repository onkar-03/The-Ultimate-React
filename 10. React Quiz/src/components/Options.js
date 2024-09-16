function Options({ question }) {
  return (
    <div className='options'>
      {/* Iterate over all the Options and display them */}
      {question.options.map((option) => (
        <button className='btn btn-option' key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
