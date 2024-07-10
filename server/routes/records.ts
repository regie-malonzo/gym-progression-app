import { Router } from 'express'
import * as db from '../db/dbFunctions.ts'

const router = Router()

// Get all records
router.get('/', async (req, res) => {
  try {
    const result = await db.getAllRecords()
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Get records by exercise ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const exerciseRecords = await db.getRecordsByExerciseId(id)
    res.json(exerciseRecords)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Add new record
router.post('/', async (req, res) => {
  try {
    const newRecord = req.body
    const id = await db.addNewRecordsByExerciseId(newRecord)
    res.status(201).json(id)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Update record by ID
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updatedRecord = req.body
    const updateStatus = await db.updateRecordeByExerciseId(id, updatedRecord)
    if (updateStatus) {
      res.sendStatus(200)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Delete record by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteRecordById(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Error deleting record: ${error}`)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
