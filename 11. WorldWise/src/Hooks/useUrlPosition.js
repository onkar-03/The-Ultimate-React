import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  // Lat and Lng passed to URL in the CityItem Component
  // Read the Lat & Lng from the URL as the State is stored in URL and ios accessible to all without any props transfer
  // For this we use the useSearchParams Hook() given by react router
  const [searchParams, setSearchParams] = useSearchParams();

  // We cant directly access the params we need to use the .get() function
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return [lat, lng];
}
