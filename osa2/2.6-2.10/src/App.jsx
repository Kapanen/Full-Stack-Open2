import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])



  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification.message} type={notification.type} />
      <h2>Phonebook</h2>
      <Filter persons={persons} search={search} handleSearchChange={(event) => setSearch(event.target.value)} />
      <PersonForm persons={persons} setPersons={setPersons} personService={personService} setNotification={setNotification} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} personService={personService} setNotification={setNotification} />
    </div>
  )

}

export default App  