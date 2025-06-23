/** The status of a bike station */
export interface StationStatus {
    /** Unique id to the station this status applies to */
    station_id: string;

    /** Number of bikes available for rental at this station */
    num_bikes_available: number;

    /** Number of docks accepting bike returns at this station */
    num_docks_available: number;
}