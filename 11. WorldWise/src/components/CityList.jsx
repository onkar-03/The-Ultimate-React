import Spinner from './Spinner';
import Message from './Message';
import styles from './CityList.module.css';
import CityItem from './CityItem';
import { useCities } from '../contexts/CitiesContext';

function CityList() {
  // Using the Context from teh Custom Provider
  const { cities, isLoading } = useCities();

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
