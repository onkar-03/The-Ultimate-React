function FinishedScreen({ points, maxPossiblePoints }) {
  // Percentage Calculation
  const percentage = (points / maxPossiblePoints) * 100;

  // Emoji Rendering
  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <div>
      <p className='result'>
        You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
    </div>
  );
}

export default FinishedScreen;
