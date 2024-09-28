import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import CityItem from './CityItem.jsx';

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message='Add ypur first city by clicking on any city on the Map !!' />
    );

  return (
    <ul className={styles.cityList}>
      {/* Map over all cities and then render the City information */}
      {cities.map((city) => (
        <CityItem className={styles.cityItem} key={city.id} city={city}>
          city
        </CityItem>
      ))}
    </ul>
  );
}

export default CityList;
