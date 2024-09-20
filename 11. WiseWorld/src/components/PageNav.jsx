// Importing the 'Link' component from 'react-router-dom' to handle client-side navigation
// import { Link } from 'react-router-dom';

// Importing the 'Link' component from 'react-router-dom' to handle client-side navigation
// The difference is that NavLink highlights the currently visiting link with an 'active' in CSS
import { NavLink } from 'react-router-dom';

// A reusable navigation component that can be used across multiple pages
function PageNav() {
  return (
    <nav>
      <ul>
        {/* 
          Navigation list item for Home Page
          - 'Link' replaces traditional anchor tags (<a>)
          - It prevents full page reloads and enables smooth navigation within the app
        */}
        <li>
          {/* 
            The root page is the home page, denoted by '/'.
            The 'to' prop defines the path to navigate when this link is clicked.
          */}
          <NavLink to='/'>Home</NavLink>
        </li>

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
      </ul>
    </nav>
  );
}

export default PageNav; // Exporting the component for use in other parts of the app
