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
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const exerciseRecord = await db.getRecordsByExerciseId(id)
    res.json(exerciseRecord)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { goal, date_of_exercise, new_record, note, exercise_id } = req.body
    const id = await db.addNewRecordsByExerciseId({
      goal,
      date_of_exercise,
      note,
      exercise_id,
      new_record,
    })
    console.log('api', id)
    const url = `/api/v1/records/${id}`
    res.status(201).json({ Record: url })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
