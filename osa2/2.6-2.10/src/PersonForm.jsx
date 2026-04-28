import { useState } from 'react'

const PersonForm = ({ persons, setPersons, personService, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }


        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            setNotification({ message: `Updated ${updatedPerson.name}'s number`, type: 'success' })

            setTimeout(() => {
              setNotification({ message: '', type: '' })
            }, 2000)
          })
          .catch(error => {
            console.error(`Failed to update person with id ${existingPerson.id}:`, error)
            setNotification({ message: `Information of ${existingPerson.name} has already been removed from server`, type: 'error' })

            setTimeout(() => {
              setNotification({ message: '', type: '' })
            }, 2000)
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log('Adding person:', newPerson)

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
        console.log('Person added successfully:', returnedPerson)
        setTimeout(() => {
          setNotification({ message: '', type: '' })
        }, 2000)
      })
      .catch(error => {
        const message = error.response?.data?.error || 'An error occurred while adding the person'
        console.log('tumotin ', error.response.data)
        setNotification({ message, type: 'error' })

        setTimeout(() => {
          setNotification({ message: '', type: '' })
        }, 2000)
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