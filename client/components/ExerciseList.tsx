import React from 'react'
import { Link } from 'react-router-dom'
import { Exercise } from '../../models/exercises'

interface ExerciseListProps {
  exercises: Exercise[]
}

export default function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div>
      <h2>Exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Link to={`/exercise/${exercise.id}`}>
              {exercise.exercise_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
