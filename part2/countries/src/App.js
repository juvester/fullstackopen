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

const SearchResult = ({ result }) => {
  if (result.length > 10) {
    return <div>Too many matches, spesify another filter</div>
  }

  if (result.length > 1) {
    return result.map(country => (
      <div key={country.cca2}>{country.name.common}</div>)
    )
  }

  if (result.length === 1) {
    return <CountryData country={result[0]} />
  }

  return <div>No matches</div>
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

  return (
    <>
      <div>
        Find countries:
        <input onChange={handleChange} />
      </div>
      <SearchResult result={matchingCountries} />
    </>
  )
}

export default App
