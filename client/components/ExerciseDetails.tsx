import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getExercisesById } from '../apis/Exercises'
import { addRecord, updateRecord } from '../apis/Records'
import { Exercise, Record } from '../../models/exercises'
import { Line, Doughnut } from 'react-chartjs-2'

interface ExerciseListProps {
  exercises: Exercise[]
}

export default function ExerciseDetail({ exercises }: ExerciseListProps) {
  const { id } = useParams<{ id: string }>()
  const exercise = exercises.find((ex) => ex.id === Number(id))
  const [newRecord, setNewRecord] = useState<Partial<Record>>({
    exercise_id: Number(id),
    goal: 0,
    new_record: 0,
    date_of_exercise: '',
    note: '',
  })
  const [exerciseRecords, setExerciseRecords] = useState<Record[]>([])

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const exerciseData = await getExercisesById(Number(id))
        if (exerciseData) {
          setExerciseRecords(exerciseData.records)
        }
      } catch (error) {
        console.error('Failed to fetch exercise details', error)
      }
    }
    fetchExerciseDetails()
  }, [id])

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addRecord(newRecord)
      const updatedExercise = await getExercisesById(Number(id))
      if (updatedExercise) {
        setExerciseRecords(updatedExercise.records)
      }
      setNewRecord({
        exercise_id: Number(id),
        goal: 0,
        new_record: 0,
        date_of_exercise: '',
        note: '',
      })
    } catch (error) {
      console.error('Failed to add records', error)
    }
  }

  const handleEditRecord = async (
    recordId: number,
    updates: Partial<Record>,
  ) => {
    try {
      await updateRecord(recordId, updates)
      const updatedExercise = await getExercisesById(Number(id))
      if (updatedExercise) {
        setExerciseRecords(updatedExercise.records)
      }
    } catch (error) {
      console.error(`Failed to update record ${recordId}:`, error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setNewRecord((prevState) => ({ ...prevState, [name]: value }))
  }
  if (!exercise) {
    return <div>Loading...</div>
  }

  //Prepare data for charts
  const chartDataLine = {
    labels: exerciseRecords.map((record) => record.date_of_exercise),
    datasets: [
      {
        label: 'New Record',
        data: exerciseRecords.map((record) => record.new_record),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  }
  const chartDataDoughnut = (
    exercise: Exercise,
    exerciseRecords: Record[],
  ): unknown => {
    // Calculate the number of records that achieved the goal
    const achievedCount = exerciseRecords.filter(
      (record) => record.new_record >= record.goal,
    ).length

    // Total number of records
    const totalRecords = exerciseRecords.length

    // Data for the doughnut chart
    const data = {
      labels: ['Goal', 'Achieved'],
      datasets: [
        {
          label: 'Goal',
          data: [totalRecords, achievedCount],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    }

    return data
  }
  return (
    <div>
      <h2>{exercise.exercise_name}</h2>
      <h3>Add Record</h3>
      <form onSubmit={handleAddRecord}>
        <label>
          Date of Exercise:
          <input
            type="text"
            name="date_of_exercise"
            value={newRecord.date_of_exercise}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Goal:
          <input
            type="number"
            name="goal"
            value={newRecord.goal}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          New Record:
          <input
            type="number"
            name="new_record"
            value={newRecord.new_record}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Note:
          <textarea
            name="note"
            value={newRecord.note}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Record</button>
      </form>

      <h3>Records</h3>
      {/* Iterate through existing records and provide editing functionality */}
      {/* Example: */}
      {exerciseRecords.map((record) => (
        <div key={record.id}>
          <p>Date: {record.date_of_exercise}</p>
          <p>Goal: {record.goal}</p>
          <p>New Record: {record.new_record}</p>
          <p>Note: {record.note}</p>
          {/* Add edit button with modal or inline form for editing */}
          <button onClick={() => handleEditRecord(record.id, { goal: 50 })}>
            Edit
          </button>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <h3>Chart: New Records Over Time</h3>
        <Line data={chartDataLine} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Chart: Goals vs. Achieved</h3>
        <Doughnut data={chartDataDoughnut} />
      </div>
    </div>
  )
}
