import React, { useState, useEffect } from 'react'
import {
  Exercise,
  ExerciseData,
  Record,
  RecordData,
} from '../../models/exercises'
import { getExercises, addExercise, deleteExercise } from '../apis/Exercises'
import {
  getRecordsByExerciseId,
  addRecord,
  deleteRecord,
} from '../apis/Records'

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null,
  )
  const [records, setRecords] = useState<Record[]>([])
  const [newExercise, setNewExercise] = useState<ExerciseData>({
    exercise_name: '',
  })
  const [newRecord, setNewRecord] = useState<RecordData>({
    exercise_id: 0,
    date_of_exercise: '',
    goal: 0,
    new_record: 0,
    note: '',
  })

  useEffect(() => {
    fetchExercises()
  }, [])

  useEffect(() => {
    if (selectedExerciseId !== null) {
      fetchRecords(selectedExerciseId)
    }
  }, [selectedExerciseId])

  const fetchExercises = async () => {
    try {
      const exercisesList = await getExercises()
      setExercises(exercisesList)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    }
  }

  const fetchRecords = async (exerciseId: number) => {
    try {
      console.log(`Fetching records for exercise ID: ${exerciseId}`)
      const recordsList = await getRecordsByExerciseId(exerciseId)
      setRecords(recordsList)
    } catch (error) {
      console.error('Error fetching records:', error)
    }
  }

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }))
  }

  const handleExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addExercise(newExercise)
      fetchExercises()
      setNewExercise({
        exercise_name: '',
      })
    } catch (error) {
      console.error('Error adding exercise:', error)
    }
  }

  const handleRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }))
  }

  const handleRecordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedExerciseId) {
        const recordToAdd = { ...newRecord, exercise_id: selectedExerciseId }
        console.log(`Adding record:`, recordToAdd)
        await addRecord(recordToAdd)
        fetchRecords(selectedExerciseId)
        setNewRecord({
          exercise_id: 0,
          date_of_exercise: '',
          goal: 0,
          new_record: 0,
          note: '',
        })
      }
    } catch (error) {
      console.error('Error adding record:', error)
    }
  }

  const handleExerciseDelete = async (id: number) => {
    try {
      await deleteExercise(id)
      fetchExercises()
    } catch (error) {
      console.error('Error deleting exercise:', error)
    }
  }

  const handleRecordDelete = async (id: number) => {
    try {
      await deleteRecord(id)
      if (selectedExerciseId !== null) {
        fetchRecords(selectedExerciseId)
      }
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }

  return (
    <div>
      <h1>Exercises</h1>
      <form onSubmit={handleExerciseSubmit}>
        <input
          type="text"
          name="exercise_name"
          placeholder="Exercise Name"
          value={newExercise.exercise_name}
          onChange={handleExerciseChange}
          required
        />
        <button type="submit">Add Exercise</button>
      </form>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.exercise_name}
            <button onClick={() => setSelectedExerciseId(exercise.id)}>
              Select
            </button>
            <button onClick={() => handleExerciseDelete(exercise.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedExerciseId !== null && (
        <div>
          <h2>
            Records for{' '}
            {exercises.find((e) => e.id === selectedExerciseId)?.exercise_name}
          </h2>
          <form onSubmit={handleRecordSubmit}>
            <input
              type="date"
              name="date_of_exercise"
              placeholder="Date of Exercise"
              value={newRecord.date_of_exercise}
              onChange={handleRecordChange}
              required
            />
            <input
              type="number"
              name="goal"
              placeholder="Goal"
              value={newRecord.goal}
              onChange={handleRecordChange}
              required
            />
            <input
              type="number"
              name="new_record"
              placeholder="New Record"
              value={newRecord.new_record}
              onChange={handleRecordChange}
              required
            />
            <input
              type="text"
              name="note"
              placeholder="Notes"
              value={newRecord.note}
              onChange={handleRecordChange}
              required
            />
            <button type="submit">Add Record</button>
          </form>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                {record.date_of_exercise} - Goal: {record.goal}, New Record:{' '}
                {record.new_record}, Note: {record.note}
                <button onClick={() => handleRecordDelete(record.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
