// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import { useUrlPosition } from '../Hooks/useUrlPosition';
import Message from './Message';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  // Using Position from Custom Hook
  const [lat, lng] = useUrlPosition();

  // States
  const [cityName, setCityName] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState();
  const [geoCodingError, setGeoCodingError] = useState('');

  const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

  // Reverse GeoCoding to Fetch the Data about the Place that the User Clicked On
  useEffect(() => {
    async function fetchCityData() {
      try {
        // Set Loading as True
        setIsLoadingGeocoding(true);
        setGeoCodingError('');

        // Fetch the Data from the URL
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        // console.log(data);

        // Update the data into the States
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

        // If no data of countryCode
        if (!data.countryCode) {
          throw new Error('Country code not found !! Click somewhere else.');
        }
      } catch (err) {
        console.error(err.message);
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
