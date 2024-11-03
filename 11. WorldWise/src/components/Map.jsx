import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

function Map() {
  // Lat and Lng passed to URL in the CityItem Component
  // Read the Lat & Lng from the URL as the State is stored in URL and ios accessible to all without any props transfer
  // For this we use the useSearchParams Hook() given by react router
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 40]);

  // Programmatic Navigation
  // We navigate to any URL in an imperative way without using any <Link/> or <NavLink/>
  // Now this navigate function is used to move to any URL that we want
  // We define the Path inside the navigate("Path")
  const navigate = useNavigate();

  // Cities Marker
  // We need to get access to the cities data here wis were our CitiesContext that we created is used
  const { cities } = useCities();

  // We cant directly access the params we need to use the .get() function
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />

        {/* 
        - Cities is an Array hence we loop over it to render a City Marker for every City 
         */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
