import WeatherData from "./WeatherData"

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      <h2>Weather in {country.capital}</h2>
      <WeatherData
        latitude={country.capitalInfo.latlng[0]}
        longitude={country.capitalInfo.latlng[1]}
      />
    </div>
  )
}

export default CountryData
