import { Router } from 'express'

import * as db from '../db/dbFunctions.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.getAllExercises()
    res.json(result)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const exercises = await db.getExerciseById(id)
    res.json(exercises)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const newExercise = req.body
    await db.addNewExercise(newExercise)
    res.sendStatus(201)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { exercise_name } = req.body
    const updateExercise = await db.updateExerciseById(id, { exercise_name })
    if (updateExercise) {
      res.sendStatus(200)
    }
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteExerciseById(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})
export default router
