/** A Station where city bikes can be parked and picked up */
export interface Station {
    /** A unique id, identifying a station */
    station_id: string;

    /** Public name of the station */
    name: string;

    /** The status of the station, or null if no status is available 
     * @see StationStatus
     */
    status: StationStatus | null;
}
