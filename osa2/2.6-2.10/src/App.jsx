import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  

  const addPerson = (event) => {
    event.preventDefault()
    const existingName = persons.some(person => person.name === newName)
    const existingNumber = persons.some(person => person.number === newNumber)

    if (existingName) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (existingNumber) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." />
      <form onSubmit={addPerson}>
        <h2>Add a new person</h2>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
            number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons
          .filter(person => 
            person.name.toLowerCase().includes(search.toLowerCase()) ||
            person.number.includes(search)
          )
          .map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )

}

export default App