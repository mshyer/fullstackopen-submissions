const Languages = ({ languageList }) => {
  return (
    <>
    <h2>Languages</h2>
    <ul>
    {languageList.map(language => {
      return (<li key={language}>{language}</li>)
    })}
    </ul>
    </>
  )
}

const WeatherSection = ({weatherData}) => {
  const imageCode = weatherData.weather[0].icon;
  const image_url = `https://openweathermap.org/img/wn/${imageCode}@2x.png`;
  return (
    <div>
      <h2>Weather for {weatherData.name}</h2>
      <p>temperature: {weatherData.main.temp} Celsius</p>
      <img src={image_url} />
      <p>wind: {weatherData.wind.speed} m/s</p>
    </div>
  )
};

const CountryInfo = ({country, weatherData}) => {
  const countryInfoStyle = {
    flag: {
      fontSize: 200,
    }
  };
  if (weatherData === '') {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <Languages languageList={Object.values(country.languages)} />
        <div style={countryInfoStyle.flag}>
          {country.flag}
        </div>
      </div>
    )
  } else {
    return (
      <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <Languages languageList={Object.values(country.languages)} />
      <div style={countryInfoStyle.flag}>
        {country.flag}
      </div>
      <WeatherSection weatherData={weatherData}/>
    </div>
    )
  }


};

const MatchList = ({matches, search, handleShow, weatherData}) => {
  if (search === '') {
    return null;
  }
  
  if (matches.length === 0) {
    return (
      <p>No Matches Found</p>
    )
  } else if (matches.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (matches.length > 1) {
    return (
      <ul>
        {matches.map(match => {
          return (
            <li key={match.name.common}>
              {match.name.common}
              <button onClick={handleShow.bind(this, match.name.common)}>
                show
              </button>
            </li>
          
          )
        })}
      </ul>
    )
  }
  else {
    return (
      <>
      <CountryInfo country={matches[0]} weatherData={weatherData}/>
      </>
    )
  }
}

export default MatchList;