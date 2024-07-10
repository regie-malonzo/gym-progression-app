import React, { useState, useEffect } from 'react'
import { Exercise, ExerciseData } from '../../models/exercises'
import { getExercises, addExercise, deleteExercise } from '../apis/Exercises'

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, SetNewExercises] = useState<ExerciseData>({
    exercise_name: '',
  })

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    try {
      const exercisesList = await getExercises()
      setExercises(exercisesList)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    SetNewExercises((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addExercise(newExercise)
      fetchExercises()
      SetNewExercises({
        exercise_name: '',
      })
    } catch (error) {
      console.error('Error adding exercise:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteExercise(id)
      fetchExercises()
    } catch (error) {
      console.error('Error deleting exercise:', error)
    }
  }
  return (
    <div>
      <h1>Exercises</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="exercise_name"
          placeholder="Exercise Name"
          value={newExercise.exercise_name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Exercise</button>
      </form>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.exercise_name}
            <button onClick={() => handleDelete(exercise.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
