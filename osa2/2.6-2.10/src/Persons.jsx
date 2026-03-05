import { useState } from 'react'

const Persons = ({ persons, search = '' }) => {
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.number.includes(search)
    )

    return  (
        <div>
            {filteredPersons.map((person, index) => 
                <p key={index}>{person.name} {person.number}</p>
            )}
        </div>
    )

} 

export default Persons