import axios from 'axios'
import { useEffect, useState } from 'react'

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
    </div>
  )
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
  }, [])

  const handleChange = (event) => {
    const searchString = event.target.value.toLowerCase()
    const filteredCountries = searchString
      ? allCountries.filter(country => country.name.common.toLowerCase().includes(searchString))
      : []
    setMatchingCountries(filteredCountries)
  }

  const handleClick = (country) => {
    setMatchingCountries([country])
  }

  let searchResult

  if (matchingCountries.length > 10) {
    searchResult = <div>Too many matches, spesify another filter</div>
  } else if (matchingCountries.length > 1) {
    searchResult = (
      <div>
        {matchingCountries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleClick(country)}>show</button>
          </div>
        )}
      </div>
    )
  } else if (matchingCountries.length === 1) {
    searchResult = <CountryData country={matchingCountries[0]} />
  } else {
    searchResult = <div>No matches</div>
  }

  return (
    <>
      <div>
        Find countries:
        <input onChange={handleChange} />
      </div>
      {searchResult}
    </>
  )
}

export default App
