import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    // Creating the Image as a Link to open home page whenever we click on the Image
    <Link to='/'>
      <img src='/logo.png' alt='WorldWise logo' className={styles.logo} />
    </Link>
  );
}

export default Logo;
