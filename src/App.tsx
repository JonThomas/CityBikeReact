import reactLogo from './assets/react.svg'
import bysykkel from './assets/bysykkel.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import StationFetcher from './components/StationFetcher/StationFetcher'

function App() {
  return (
    <>         {/* React Fragment */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://oslobysykkel.no/" target="_blank">
          <img src={bysykkel} className="logo" alt="Bysykkel" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>CityBike React</h1>
        <StationFetcher />  
      <p className="read-the-docs">
        The information above is fetched from <a target="_blank" href="https://oslobysykkel.no/apne-data/sanntid">https://oslobysykkel.no/apne-data/sanntid</a>, specifically:&nbsp; 
        <a target="_blank" href="https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json">https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json</a> for listing stations, and&nbsp;
        <a target="_blank" href="https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json">https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json</a> for the status of each station.
      </p>
    </>
  )
}

export default App
