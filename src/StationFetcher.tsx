import { useState, useEffect } from 'react';

const StationFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {

    fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json')
      .then((response) => response.json())
      .then((data) => {
        const sortedStations = data.data.stations.sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name));
        setData(sortedStations);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });   
    }, []);

  interface Station {
    station_id: string;
    name: string;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>API Data</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <ul>
        {data &&
          (data as Station[]).map((station) => (
            <div key={station.station_id}>
              <strong>{station.name}</strong>: fdsa
            </div>
          ))}
      </ul> */}

      <table>
        <thead>
          <tr>
            <th>Station Id</th><th>Station name</th>
          </tr>
        </thead>
        <tbody>
          {data && (data as Station[]).map((station) => (
            <tr key={station.station_id}>
              <td>{station.station_id}</td><td>{station.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default StationFetcher;
