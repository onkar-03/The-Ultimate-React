import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
  // Using the useNavigate to move and forward using the navigate function
  // Using the navigate function in teh Buttons of Form to Add and Back functionality
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type='back'
        // Using the navigate function to go back one step on click back button
        // Move Back: -1 is used to go back one Step -2 for 2 steps back and so on
        // Move Front: +1 is used to go one step ahead and so on
        onClick={(e) => {
          // Prevent the Default Reload as on Button click the Form reloads because the button is present inside the Form container
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
      ;
    </div>
  );
}

export default BackButton;
