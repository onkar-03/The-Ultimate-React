import { NavLink } from 'react-router-dom';
import PageNav from '../components/PageNav';
import AppNav from '../components/AppNav';

function Home() {
  return (
    <div>
      {/* 
      - Importing Links to navigate across different Pages
       */}
      <PageNav />
      <AppNav />
      <h1 className='test'>WorldWise</h1>

      {/* 
      - Declaring the navigation path to the App Page where the path is app and we go through the root page hence we write '/app'
      */}
      <NavLink to='/app'> Go to App </NavLink>
    </div>
  );
}

export default Home;
