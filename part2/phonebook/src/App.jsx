import { useState } from 'react'

const App = () => {
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name:
        <input type='text' onChange={handleFilterChange} />
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input type='text' value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:
          <input type='text' value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <input type="submit" value='Add' />
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App
