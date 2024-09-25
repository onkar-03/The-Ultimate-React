// Importing CSS
import styles from './AppNav.module.css';
import { NavLink } from 'react-router-dom';

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='/app/cities'>Cities</NavLink>
        </li>
        <li>
          <NavLink to='countries'>Countries</NavLink>
        </li>
        <li>
          <NavLink to='form'>Form</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
