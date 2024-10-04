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
  // Getting the Id, Lat, Lng to display for each of the City
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      {/* STEP 2: 
      - For each Item we want a special Link hence we wrap all the Content inside a <NavLink/>
      - Link to the Route with city id parameter that we created for in the APP.jsx
      - Use the NavLink component from react-router-dom to navigate to the route with the city id parameter
      - We just pass the current id as we want just this to add to the current URL
      - Defining the query string having the lat and lng of the country as well in the Link
      - Now the State that we had inside our Application is transferred to the URL and is available globally and we can use them anywhere we want which we read in Map Component to depict the City Position
      */}
      <NavLink
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn}>&times;</button>
      </NavLink>
    </li>
  );
}

export default CityItem;
