import styles from './CityItem.module.css';

const formatDate = (date) => {
  // Format the date using the Intl.DateTimeFormat API
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

function CityItem({ city }) {
  // Destructure the city data into three variables: cityName, date, and emoji
  const { cityName, date, emoji } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{cityName}</span>
      <span className={styles.date}>{formatDate(date)}</span>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
