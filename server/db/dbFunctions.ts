import connection from './connection.ts'
import { Exercise } from '../../models/exercises.ts'

export async function getAllExercises(): Promise<Exercise[]> {
  return await connection('exercises').select('exercise_name')
}

export async function getExerciseById(id: number) {
  return await connection('exercises').where({ id }).first()
}
