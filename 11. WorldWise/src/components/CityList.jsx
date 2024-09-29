import Spinner from './Spinner';
import Message from './Message';
import styles from './CityList.module.css';
import CityItem from './CityItem';

/* eslint-disable react/prop-types */
function CityList({ cities, isLoading }) {
  // If the Data is still being Fetched then we display the S[pinner component
  if (isLoading) return <Spinner />;

  // If there are no Cities selected then we display this message
  if (cities.length === 0)
    return (
      <Message message='Add your first city by clicking on any city on the Map!!' />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
