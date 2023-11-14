const Header = ({ course }) =>
  <h2>{course.name}</h2>

const Total = ({ sumOfExercises }) =>
  <strong>Total of {sumOfExercises} exercises</strong>

const Part = ({ part }) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
  parts.map(part => <Part key={part.id} part={part} />)

const Course = ({ course }) =>
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total sumOfExercises={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </div>

export default Course
