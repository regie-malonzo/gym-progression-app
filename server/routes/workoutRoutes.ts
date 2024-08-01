import { Router } from 'express'
import * as db from '../db/dbFunctions.ts'
const router = Router()
router.get('/', async (req, res) => {
  try {
    const workouts = await db.getAllWorkouts()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const workout = await db.getWorkoutById(Number(req.params.id))
    if (workout) {
      res.json(workout)
    } else {
      res.status(404).json({ error: 'Workout not found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newWorkout = req.body
    await db.addNewWorkout(newWorkout)
    res.status(201).json({ message: 'Workout added successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = req.body
    await db.updateWorkoutById(Number(req.params.id), updatedWorkout)
    res.json({ message: 'Workout updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.deleteWorkoutById(Number(req.params.id))
    res.json({ message: 'Workout deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})
export default router
