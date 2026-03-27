import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios      
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!country.capital) return

    const capital = country.capital[0]

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Weather fetch failed:', error)
      })
  }, [country, apiKey])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h2>Languages</h2>
      <ul>
        {country.languages &&
          Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />

      {weather ? (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />

      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
    {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
      filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setValue(country.name.common)}>show</button>
        </div>
      ))
    )}
        {filteredCountries.length === 1 && (
      <Country country={filteredCountries[0]} />
    )}
    </div>
  )
}

export default App