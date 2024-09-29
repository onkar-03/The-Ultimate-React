import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* 
      - <Outlet /> is a place holder where the nested child routes render
      - <Outlet /> Used to display the Nested Routes using the Outlet Component that the react router provides us
      */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
