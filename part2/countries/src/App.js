import {useState, useEffect} from 'react';
import CountrySearch from './components/CountrySearch';
import MatchList from './components/MatchList';
import axios from 'axios';
import RestServices from './services/restcountries';
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [apiData, setApiData] = useState([]);
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState('');
  const [disableToggle, setDisableToggle] = useState(true);
  const [weatherData, setWeatherData] = useState('');

  let disabled = true;

  function getWeatherData(country) {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    axios.get(url).then(response => {
      console.log('response :>> ', response);
      setWeatherData(response.data);
    }).catch(err => {
      console.log(err);
    })

  }

  useEffect(() => {
    //Production will use this code
    // RestServices.getAll().then(response => {
    //   console.log('finished loading');
    //   setMatches(response.data);
    //   setApiData(response.data);
    //   setDisableToggle(false);

    // })

    //Development relies on local server data so no fetches sent
    axios.get('http://localhost:3001/data').then(response => {
      setMatches(response.data);
      setApiData(response.data);
      setDisableToggle(false);

    })

  }, [])

  const handleChange = function(eve) {
    // Querying the external API for country data (too slow)
    // RestServices.getCountry(eve.target.value).then(response => {
    //   console.log('response :>> ', response.data);
    //   setMatches(response.data);
    // }).catch(err => {
    //   console.log('no Countries found.');
    //   setMatches([]);
    // })
    // setSearch(eve.target.value);
    const searchTerm = eve.target.value;
    setSearch(searchTerm);
    let filteredMatches;
    if (searchTerm !== '') {
      filteredMatches = apiData.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(searchTerm.toLowerCase());
      });
    } else {
      filteredMatches = [];
    }
    setMatches(filteredMatches);

  };

  const handleShow = function(commonName) {
    const country = apiData.filter(country => country.name.common === commonName)[0];
    getWeatherData(country);
    setMatches(apiData.filter(country => country.name.common === commonName));

  };

  return (
    <div>
      <CountrySearch onChangeCb={handleChange} disabled={disableToggle}/>
      <MatchList matches={matches} search={search} handleShow={handleShow} weatherData={weatherData}/>
    </div>
  )
}

export default App;
