// Importing CSS
import styles from './AppNav.module.css';
import { NavLink } from 'react-router-dom';

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        {/* 
        - Specifying the navigation links in the APP navigation component which we see on opening the explore button
        - The Nested Routes can be declared both ways /parent/pageName OR /pageName
        */}
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
