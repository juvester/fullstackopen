import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherData = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`

    console.log('Calling weather API...')

    axios
      .get(url)
      .then(response => setWeather(response.data))
      .catch(() => {
        console.log('Weather API call failed.')
      })
  }, [])

  if (!weather) {
    return null
  }

  return (
    <div>
      <div>Temperature: {weather.main.temp} &deg;C</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather.description}
      />
      <div>Wind speed: {weather.wind.speed} m/s</div>
    </div>
  )
}

export default WeatherData
