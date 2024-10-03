import styles from './CityItem.module.css';
import { NavLink } from 'react-router-dom';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

/* eslint-disable react/prop-types */
function CityItem({ city }) {
  // Destructuring City Item
  const { cityName, emoji, date } = city;
  return (
    <li>
      {/* STEP 2: 
      - Link to the Route with city id parameter that we created for in teh APP.jsx
      - Use the NavLink component from react-router-dom to navigate to the route with the city id parameter
      - We just pass the current id as we want just this to add to the current URL
      - As the CityList.jsx passes the prop here hence we link the route here 
      */}
      <NavLink to={`${city.id}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn}>&times;</button>
      </NavLink>
    </li>
  );
}

export default CityItem;
