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
import RecordChart from './Charts'

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
    goal_unit: 'kg', // Default unit
    record_unit: 'kg',
  })
  const [exerciseGoals, setExerciseGoal] = useState<{
    [exerciseId: number]: number
  }>({})

  useEffect(() => {
    fetchExercises()
  }, [])

  useEffect(() => {
    if (selectedExerciseId !== null) {
      fetchRecords(selectedExerciseId)
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        goal: exerciseGoals[selectedExerciseId] || 0,
      }))
    }
  }, [exerciseGoals, selectedExerciseId])

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
      setNewExercise({ exercise_name: '' })
    } catch (error) {
      console.error('Error adding exercise:', error)
    }
  }

  const handleRecordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
        await addRecord(recordToAdd)
        fetchRecords(selectedExerciseId)
        setNewRecord({
          exercise_id: 0,
          date_of_exercise: '',
          goal: exerciseGoals[selectedExerciseId] || 0,
          new_record: 0,
          note: '',
          goal_unit: 'kg', // Reset to default unit
          record_unit: 'kg',
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

  const handleGoalSet = () => {
    if (selectedExerciseId !== null) {
      setExerciseGoal((prevGoals) => ({
        ...prevGoals,
        [selectedExerciseId]: newRecord.goal,
      }))
    }
  }

  return (
    <div className="exercises-container">
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
        <div className="records-container">
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
            <select
              name="goal_unit"
              value={newRecord.goal_unit}
              onChange={handleRecordChange}
              required
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="km">km</option>
              <option value="miles">miles</option>
            </select>
            <input
              type="number"
              name="new_record"
              placeholder="New Record"
              value={newRecord.new_record}
              onChange={handleRecordChange}
              required
            />
            <select
              name="record_unit"
              value={newRecord.record_unit}
              onChange={handleRecordChange}
              required
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="km">km</option>
              <option value="miles">miles</option>
            </select>
            <input
              type="text"
              name="note"
              placeholder="Notes"
              value={newRecord.note}
              onChange={handleRecordChange}
            />
            <button type="submit">Add Record</button>
          </form>
          <button onClick={handleGoalSet}>Set Goal</button>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                <div className="record-details">
                  <div className="record-info">
                    <span className="date">{record.date_of_exercise}</span> -
                    Goal:{' '}
                    <span className="goal">
                      {record.goal} {record.goal_unit}
                    </span>
                    , New Record:{' '}
                    <span className="new-record">
                      {record.new_record} {record.record_unit}
                    </span>{' '}
                    , Note: <span className="note">{record.note}</span>
                  </div>
                  <div className="record-actions">
                    <button onClick={() => handleRecordDelete(record.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <RecordChart
            exerciseId={selectedExerciseId}
            fetchRecords={() => fetchRecords(selectedExerciseId)}
          />
        </div>
      )}
    </div>
  )
}
