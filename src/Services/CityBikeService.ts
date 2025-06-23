import type { Station } from '../types/Station';
import type { StationStatus } from '../types/StationStatus';

const header = {
  'Client-Identifier': 'JonThomasEliassen-CityBikeReact',
};

/**
 * Fetches station and station status data from the Oslo Bysykkel API,
 * merges the data, and returns a combined list of stations with their statuses.
 * 
 * @async
 * @function fetchMergedData
 * @returns {Promise<Station[]>} A promise that resolves to an array of stations with their statuses.
 */
export const fetchMergedData = async () => {
  const [rawStations, rawStationStatus] = await Promise.all([
    fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json' , { headers: header }  )
      .then(res => res.json()),
    fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json' , { headers: header }  )
      .then(res => res.json())
  ]);

  return mergeData(rawStations.data.stations, rawStationStatus.data.stations);
};

/**
 * Merges all station data with all station status data by matching their `station_id`.
 * 
 * @function mergeData
 * @param {Station[]} stations - An array of station objects.
 * @param {StationStatus[]} statuses - An array of station status objects.
 * @returns {Station[]} A new array of stations, each with an added `status` property.
 */
export const mergeData = (stations: Station[], statuses: StationStatus[]) => {
  
  return stations.map((station) => {
    const status = statuses.find((s) => s.station_id === station.station_id);
    // Using the spread operator to copy all properties from the station object 
    // into a new station objects to avoid mutation, and add the status to it
    return { ...station, status: status ? status : null };
  });
};