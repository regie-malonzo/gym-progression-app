import connection from './connection.ts'
import { Exercise } from '../../models/exercises.ts'

export async function getAllExercises(db = connection): Promise<Exercise[]> {
  return db('exercises').select('exercise_name')
}
