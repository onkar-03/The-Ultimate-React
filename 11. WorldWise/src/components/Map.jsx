import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../Hooks/useGeolocation';
import { useUrlPosition } from '../Hooks/useUrlPosition';
import Button from '../components/Button';

function Map() {
  // All Hooks at the Top:
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // Cities Marker
  // We need to get access to the cities data here from our CitiesContext that we created is used
  const { cities } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // Using Position from Custom Hook
  const [lat, lng] = useUrlPosition();

  // We want the marker to be remembered when we click back from a current city
  // Hence we use a state to store the marker and update only if they exist
  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  // Effect to sync the Geolocation Position with the Map Position
  useEffect(
    () => {
      // Only if the Geolocation Position Exists we change the Map Position to the current Position
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    // Run whenever there is a change in geolocation position
    [geolocationPosition],
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your Position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// The Center is not reactive, means that the location wont change if we click on another city
// So to implement this functionality within leaflet library on out own
// All the things in the Leaflet Library works on Components, so if we want to implement additional functionality we need to create a custom component

// Custom Component to Move Marker Location
function ChangeCenter({ position }) {
  //To get the current instance of the Map from Leaflet we need to use useMap() Hook
  const map = useMap();

  // We want to set the Map Marker to the currently selected city place
  map.setView(position);

  // As its a Component it needs to return something hence we returned null
  return null;
}

// Custom Component for Moving Marker on Click
function DetectClick() {
  // Programmatic Navigation
  // We navigate to any URL in an imperative way without using any <Link/> or <NavLink/>
  // Now this navigate function is used to move to any URL that we want
  // We define the Path inside the navigate("Path")
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      // We set the Map position to the clicked coordinates
      // Setting the lat and lng of the coordinates in the URL to use it at places we need
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
