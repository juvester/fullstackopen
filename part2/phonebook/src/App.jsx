import { useState } from 'react'

const App = () => {
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type='text' value={newName} onChange={handleNameChange} />
        </label>
        <div>
          <input type="submit" value='Add' />
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App
