import { useState } from 'react'

const NumberOfVotes = ({ votes }) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const mostVoted = points.indexOf(Math.max(...points))

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const handleNext = () => {
    let nextAnecdote = Math.floor(Math.random() * anecdotes.length)

    if (nextAnecdote === selected)
      nextAnecdote = (nextAnecdote + 1) % anecdotes.length

    setSelected(nextAnecdote)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <NumberOfVotes votes={points[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <NumberOfVotes votes={points[mostVoted]} />
    </div>
  )
}

export default App
