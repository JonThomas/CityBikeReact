import type { Station } from './types/Station';
import type { StationStatus } from './types/StationStatus';

const header = {
  'Client-Identifier': 'JonThomasEliassen-CityBikeReact',
};

export const fetchMergedData = async () => {
  const [rawStations, rawStationStatus] = await Promise.all([
    fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json' , { headers: header }  )
      .then(res => res.json()),
    fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json' , { headers: header }  )
      .then(res => res.json())
  ]);

  return mergeData(rawStations.data.stations, rawStationStatus.data.stations);
};

const mergeData = (stations: Station[], statuses: StationStatus[]) => {
  // custom merge logic depending on shape
  return stations.map((station) => {
    const status = statuses.find((s) => s.station_id === station.station_id);
    return { ...station, status: status ? status : null };
  });
};