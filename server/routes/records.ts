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
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { goal, new_record, date_of_exercise, note } = req.body
    const updateRecord = await db.updateRecordeByExerciseId(id, {
      goal,
      new_record,
      date_of_exercise,
      note,
    })
    if (updateRecord) {
      console.log('updated content')
      res.sendStatus(201)
    }
    // console.log(updateRecord)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteRecordById(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
