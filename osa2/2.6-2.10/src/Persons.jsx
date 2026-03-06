import { useState } from 'react'

const Persons = ({ persons, search = '', setPersons, personService }) => {
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.number.includes(search)
    )

    const handleDelete = (id, name) => {

        const confirmDelete = window.confirm(`Delete ${name}?`)

        if (!confirmDelete) { 
            return;
        }

        personService.remove(id)
            .then(() => {
                const updatedPersons = persons.filter(person => person.id !== id)
                setPersons(updatedPersons)
            })
            .catch(error => {
                console.error(`Failed to delete person with id ${id}:`, error)
            })
    }

    return (
        <div>
            {filteredPersons.map((person) => 
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
                </p>
            )}
        </div>
    )
}

export default Persons