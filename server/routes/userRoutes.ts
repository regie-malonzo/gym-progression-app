import { Router } from 'express'
import * as db from '../db/dbFunctions.ts'
const router = Router()
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await db.getUserById(Number(req.params.id))
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser = req.body
    await db.addNewUser(newUser)
    res.status(201).json({ message: 'User added successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = req.body
    await db.updateUserById(Number(req.params.id), updatedUser)
    res.json({ message: 'User updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.deleteUserById(Number(req.params.id))
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})
export default router
