import { useState } from 'react'

const PersonForm = ({ persons, setPersons, personService }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    const newPerson = { 
      name: newName, 
      number: newNumber,
      id: String(Math.max(...persons.map(p => parseInt(p.id) || 0), 0) + 1)
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={addPerson}>
      <h2>Add a new person</h2>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm