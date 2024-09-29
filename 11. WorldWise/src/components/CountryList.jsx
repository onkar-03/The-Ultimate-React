import Spinner from './Spinner';
import Message from './Message';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';

/* eslint-disable react/prop-types */
function CountryList({ cities, isLoading }) {
  // If the Data is still being Fetched then we display the S[pinner component
  if (isLoading) return <Spinner />;

  // If there are no Cities selected then we display this message
  if (cities.length === 0)
    return (
      <Message message='Add your first city by clicking on any city on the Map!!' />
    );

  // We want to have distinct countries a person has been to
  // So we traverse all the cities added in teh cities state and keep the distinct countries traveled ina  countries array
  // Accumulator is empty countries array [] initially, city is the current item from cities array
  const countries = cities.reduce((arr, city) => {
    // Check if the country of the current city is already in the accumulator array (arr)
    if (!arr.map((el) => el.country).includes(city.country)) {
      // If the country is not in arr, add it by returning a new array with the existing arr plus the new country object
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      // If the country is already in arr, return arr unchanged
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
