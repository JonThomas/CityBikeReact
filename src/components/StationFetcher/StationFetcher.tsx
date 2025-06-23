import { useState, useEffect } from 'react';
import './StationFetcher.css';
import type { Station } from '../../types/Station';
import { fetchMergedData } from '../../services/CityBikeService';

/**
 * A React component that fetches and displays a list of city bike stations.
 * 
 * This component:
 * - Fetches station data from the `fetchMergedData` service.
 * - Sorts the stations alphabetically by name.
 * - Displays a html table, including the station name, number of available bikes, and empty spots.
 * 
 * @component
 * @returns {JSX.Element} A table displaying the station data.
 */
const StationFetcher = () => {
  const [data, setData] = useState<Station[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMergedData()
      .then((data) => {
        const sortedStations = data.sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name));
        setData(sortedStations as Station[]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Station name</th>
            <th>Number of available bikes</th>
            <th>Empty spots</th>
          </tr>
        </thead>
        <tbody>
          {data && (data as Station[]).map((station) => (
            <tr key={station.station_id}>
              <td>{station.name}</td>
              <td>{station.status.num_bikes_available}</td>
              <td>{station.status.num_docks_available}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default StationFetcher;
