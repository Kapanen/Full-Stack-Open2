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

      {filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
        </div>
      ))}
    </div>
  )
}

export default App