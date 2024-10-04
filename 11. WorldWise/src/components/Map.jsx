import styles from './Map.module.css';
import { useParams, useSearchParams } from 'react-router-dom';

function Map() {
  // Lat and Lng passed to URL in the CityItem Component
  // Read the Lat & Lng from the URL as the State is stored in URL and ios accessible to all without any props transfer
  // For this we use the useSearchParams Hook() given by react router
  const [searchParams, setSearchParams] = useSearchParams();

  // We cant directly access the params we need to use the .get() function
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer}>
      <h1>MAP</h1>
      <h1>
        Position: {lat}, {lng}{' '}
      </h1>
      {/* Update the Lat and Lng on Button Click */}
      <button
        onClick={() => {
          setSearchParams({ lat: 69, lng: 69 });
        }}
      >
        Change Pos
      </button>
    </div>
  );
}

export default Map;
