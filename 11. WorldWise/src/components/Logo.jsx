import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    // Attaching a Link to th Logo in order to navigate to the Home page when we click on it
    <Link to='/'>
      <img src='/logo.png' alt='WorldWise logo' className={styles.logo} />
    </Link>
  );
}

export default Logo;
