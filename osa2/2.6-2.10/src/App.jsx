import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Persons from './Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} search={search} handleSearchChange={(event) => setSearch(event.target.value)} />
      <PersonForm persons={persons} setPersons={setPersons} personService={personService} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} personService={personService} />
    </div>
  )

}

export default App  