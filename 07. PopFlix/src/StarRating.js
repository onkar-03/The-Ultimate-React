import { useState } from 'react';
import PropTypes from 'prop-types';

// Global Styling
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const StarContainerStyle = {
  display: 'flex',
};

// Defining Prop Types of Props received by the Component
StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  messages: PropTypes.arrayOf,
};

// Stars Component
// Default Value as 10 inc as no value is passed
// Improved the Component with Props as Components API
export default function StarRating({
  maxRating = 10,
  color = '#fcc419',
  size = 38,
  defaultRating = 0,
  messages = '',
  onSetRating,
}) {
  const StyleText = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size}px`,
  };

  // As we wan the Stars to be empty if not hovered and Filled when hovered, means that we need some state to hold the current state of Star
  const [rating, setRating] = useState(defaultRating);

  // we crate a New State to store the Temporary Star Rating on hover
  const [tempRating, setTempRating] = useState(0);

  // Event Handler to Update the rating State
  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  // Event Handler to Update the tempRating State
  function handleTemporaryRating(tempRating) {
    setTempRating(tempRating);
  }

  return (
    <div style={containerStyle}>
      <div style={StarContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          // Array.from is used to create an array of a specific length, in this case, 'maxRating'.
          // The first argument is an object with a 'length' property, which determines the length of the array.
          // This will create an array with 'maxRating' number of undefined elements.

          // The second argument is a mapping function that takes two parameters:
          // '_' represents the current element (which is undefined in this case),
          // 'i' is the index of the element in the array, ranging from 0 to maxRating - 1.

          // The mapping function returns a JSX element (the <Star /> component) for each index.
          // 'key={i}' ensures that each <Star /> component has a unique key, which is important for React's rendering process.

          // For Click on Each of the Stars we wan to update the rating State
          // As we want it to be a callback function hence define it as this
          // We pass as a prop and accept it in the Star Component
          // 'onRate={() => handleRating(i + 1)}' sets up a click handler that, when the star is clicked,
          // calls the handleRating function with the rating value (i + 1), since 'i' is 0-based.

          <Star
            key={i}
            // Passing Event handlers to Star Component for every rating user does
            onRate={() => handleRating(i + 1)}
            // Passing Event handlers to Star Component Hover User does on Stars
            onHoverIn={() => handleTemporaryRating(i + 1)}
            onHoverOut={() => handleTemporaryRating(0)}
            // Using the Full var to hold the T/F value
            // If user just hovers we display the tempRating State value otherwise we display the rating state value
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
          />
        ))}
      </div>

      {/* 
      - Using Short Circuiting to Display the Rating Number i.e. the number of Stars currently Hovered / Rated OR just display an empty String 
      - If None of them is true i.e. all are 0 then an empty string is displayed
      - Display Messages on Rating only if the number of Stars to rate are equal to the messages array length
      */}
      <p style={StyleText}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}

const StarStyle = {
  width: '24px',
  height: '24px',
  display: 'block',
  cursor: 'pointer',
};

// Accepting States
function Star({ onRate, full, onHoverIn, onHoverOut, color }) {
  return (
    // Call the Setter Function to update the Rating State OnClick
    // On Hover we want to change the temporary rating which is handled by OnMouseEnter
    <span
      role='button'
      style={StarStyle}
      // Calling Event Handlers on Click and OnMouseEnter ('HoverIn') & OnMouseLeave('HoverOut')
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {
        // Conditional Rendering of Full / Empty Star based on value of full
        // Full has True/ False value which depends on whether the current star is clicked or not
        full ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill={color}
            stroke={color}
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke={color}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='{2}'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            />
          </svg>
        )
      }
    </span>
  );
}
