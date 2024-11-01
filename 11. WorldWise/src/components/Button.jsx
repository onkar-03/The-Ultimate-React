import styles from './Button.module.css';

/* eslint-disable react/prop-types */
function Button({ children, onClick, type }) {
  return (
    // Using the styles.[type] we dynamically read the type of button passed and add the class accordingly
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
