// Importing the 'Link' component from 'react-router-dom' to handle client-side navigation to different pages
// import { Link } from 'react-router-dom';

// Importing the 'Nav Link' component from 'react-router-dom' to handle client-side navigation to different pages
// The difference is that NavLink highlights the currently visiting link with an 'active' in CSS
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

// Importing CSS Modules
import styles from './PageNav.module.css';

// A reusable navigation component with all the Links that can be used across navigate across multiple pages
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      {/* Using CSS Styles defined in PageNav.module.css */}
      <ul>
        {/* 
          Navigation list item for Home Page
          - <Link to=''/> replaces traditional anchor tags (<a href=''>)
          - Link is a hyperlink but using this makes out Application SPA
          - It prevents full page reloads and enables smooth navigation within the app
          - Here we define a Link for each page as a List Item, along with the path info to that page in the'to' attribute of <Link> 
        */}

        {/* 
            The root page is the home page, denoted by '/'.
            The 'to' prop defines the path to navigate when this link is clicked.
          */}

        {/* 
           Navigation list item for Pricing Page 
          - The path to Pricing is '/pricing'
          - All the pages need to have the '/' root link and then the link to their page
        */}
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>

        {/* 
          Navigation list item for Product Page 
          - The path to Product is '/product'
        */}
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>

        {/* 
          Navigation list item for Product Page 
          - The path to Product is '/login'
        */}
        <li>
          <NavLink to='/login' className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav; // Exporting the component for use in other parts of the app
