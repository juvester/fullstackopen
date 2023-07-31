const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      Name:
      <input type='text' value={props.nameValue} onChange={props.onNameChange} />
    </div>
    <div>
      Number:
      <input type='text' value={props.numberValue} onChange={props.onNumberChange} />
    </div>
    <div>
      <input type="submit" value='Add' />
    </div>
  </form>
)

export default PersonForm
