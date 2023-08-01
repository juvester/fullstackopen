const Persons = ({ persons, handleDelete }) => (
  persons.map(person =>
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  )
)

export default Persons
