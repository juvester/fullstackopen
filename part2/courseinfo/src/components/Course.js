const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>

const Course = ({ course }) =>
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </div>

export default Course
