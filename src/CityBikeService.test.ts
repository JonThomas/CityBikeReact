import { mergeData } from './CityBikeService';
import { expect, test, describe } from 'vitest'

describe('merging stations with station status', () => {
    test('station should get a status when a matching status exists', () => {
        const stations = [{ station_id: '1', name: 'Station 1', status: null }];
        const statuses = [{ station_id: '1', num_bikes_available: 5, num_docks_available: 10 }];
        
        const merged = mergeData(stations, statuses);

        expect(merged).toEqual([
            {
                station_id: '1',
                name: 'Station 1',
                status: statuses[0]
            }
        ]);
    });

    test('station should not get a status when no matching status exists', () => {
        const stations = [{ station_id: '1', name: 'Station 1', status: null }];
        const statuses = [{ station_id: '2', num_bikes_available: 5, num_docks_available: 10 }];
        
        const merged = mergeData(stations, statuses);

        expect(merged).toEqual([
            {
                station_id: '1',
                name: 'Station 1',
                status: null
            }
        ]);
    });

    test('all stations should get correct status when matching statuses exists', () => {
        const station1 = { station_id: '1', name: 'Station 1', status: null };
        const station89003 = { station_id: '89003', name: 'Station 89003', status: null };
        const status1 = { station_id: '1', num_bikes_available: 5, num_docks_available: 10 };
        const status89003 = { station_id: '89003', num_bikes_available: 0, num_docks_available: 321 };
        
        const merged = mergeData([station1, station89003], [status1, status89003]);

        const mergedStation1 = merged.find(station => station.station_id === '1');
        const mergedStation89003 = merged.find(station => station.station_id === '89003');
        expect(mergedStation1!.status).toEqual(status1);
        expect(mergedStation89003!.status).toEqual(status89003);
    });

});