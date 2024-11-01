import Spinner from './Spinner';
import Message from './Message';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  // Using the Context from teh Custom Provider
  const { cities, isLoading } = useCities();

  // If the Data is still being Fetched then we display the S[pinner component
  if (isLoading) return <Spinner />;

  // If there are no Cities selected then we display this message
  if (cities.length === 0)
    return (
      <Message message='Add your first city by clicking on any city on the Map!!' />
    );

  // We want to create an array of distinct countries a person has been to
  // We will traverse all the cities added in the `cities` state and extract only unique countries

  // Start with an empty accumulator array (initial value of reduce: [])
  // Example of input:
  // cities = [
  //   { cityName: "Lisbon", country: "Portugal", emoji: "🇵🇹" },
  //   { cityName: "Madrid", country: "Spain", emoji: "🇪🇸" },
  //   { cityName: "Berlin", country: "Germany", emoji: "🇩🇪" },
  //   { cityName: "Barcelona", country: "Spain", emoji: "🇪🇸" }
  // ]
  const countries = cities.reduce((arr, city) => {
    // `arr` is the accumulator that holds the distinct countries
    // `city` is the current city object from the `cities` array being processed

    // We want to check if the current city’s country already exists in `arr`:
    // Use `map` to extract all the country names from the `arr` array of objects and then use `includes` to check if the current `city.country` is already in that array
    if (!arr.map((el) => el.country).includes(city.country)) {
      // If the country is NOT in `arr`, add it by creating a new array:
      // - The spread operator `...arr` keeps the previous elements of `arr`
      // - Then we add a new object with the current city’s `country` and `emoji`
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      // If the country is already in `arr`, just return the `arr` unchanged
      return arr;
    }

    // Example step-by-step:
    // 1st city (Lisbon): `arr = []`, no "Portugal" -> Add {country: "Portugal", emoji: "🇵🇹"}
    // 2nd city (Madrid): `arr = [{country: "Portugal", emoji: "🇵🇹"}]`, no "Spain" -> Add {country: "Spain", emoji: "🇪🇸"}
    // 3rd city (Berlin): `arr = [{country: "Portugal", emoji: "🇵🇹"}, {country: "Spain", emoji: "🇪🇸"}]`, no "Germany" -> Add {country: "Germany", emoji: "🇩🇪"}
    // 4th city (Barcelona): `arr = [{country: "Portugal", emoji: "🇵🇹"}, {country: "Spain", emoji: "🇪🇸"}, {country: "Germany", emoji: "🇩🇪"}]`, "Spain" exists -> Don't add
  }, []); // Start with an empty array as the initial value of `arr`

  // Result:
  // countries = [
  //   {country: "Portugal", emoji: "🇵🇹"},
  //   {country: "Spain", emoji: "🇪🇸"},
  //   {country: "Germany", emoji: "🇩🇪"}
  // ]

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
