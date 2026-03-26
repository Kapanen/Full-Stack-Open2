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

  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />

      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
    {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
      filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
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