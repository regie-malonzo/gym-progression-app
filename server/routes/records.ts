import { Router } from 'express'

import * as db from '../db/dbFunctions.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.getAllRecords()
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const exerciseRecord = await db.getExerciseById(id)
    res.json(exerciseRecord)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
