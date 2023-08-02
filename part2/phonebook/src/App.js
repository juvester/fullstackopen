import { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  function handleUpdate(person) {
    const message = `${person.name} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        personService
          .update(person.id, { ...person, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
        setNewName('')
        setNewNumber('')
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name == newName)
    if (existingPerson) {
      handleUpdate(existingPerson)
      return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    const name = persons.find((person) => person.id === id).name

    if (!window.confirm(`Delete ${name}?`)) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        alert(`${name} was already deleted from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <Filter onChange={handleFilterChange}/>

      <h3>Add a new person</h3>
      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
