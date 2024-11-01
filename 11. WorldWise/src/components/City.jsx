// import styles from './City.module.css';
import { useParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
import styles from './City.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  // STEP 3:
  // Retrieve and Read the Data that we stored in the URL
  // For this we use the useParam Hook
  // As we stored the id of cities we destructure it here using useParams()
  const { id } = useParams();
  console.log(id);

  const { getCity, currentCity } = useCities();

  // Get the details about the City using the getCity Function from the Context Provider
  useEffect(() => {
    getCity(id);
  }, [id]);

  // Get the current City details from the Context Provider
  const { cityName, date, notes } = currentCity;

  console.log(currentCity);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>{cityName}</h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
    </div>
  );
}

export default City;
