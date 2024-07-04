import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getExercisesById } from '../apis/Exercises'
import { addRecord, updateRecord } from '../apis/Records'
import { Exercise, Record } from '../../models/exercises'
import { Line, Doughnut } from 'react-chartjs-2'

interface ExerciseListProps {
  exercises: Exercise[]
}

export function ExerciseDetail({ exercises }: ExerciseListProps) {
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
  const chartDataDoughnut = {
    labels: ['Goal', 'Achieved'],
    datasets: [
      {
        label: 'Goal',
        data: [exercise.goal, exerciseRecords.reduce],
      },
    ],
  }
}
