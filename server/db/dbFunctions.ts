import connection from './connection.ts'
import { Exercise } from '../../models/exercises.ts'

export async function getAllExercises(): Promise<Exercise[]> {
  return await connection('exercises').select('exercise_name')
}

export async function getExerciseById(id: number) {
  return await connection('exercises').where({ id }).first()
}

export async function addNewExercise(newExercise: Exercise) {
  await connection('exercises').insert(newExercise)
}

export async function updateExercise(
  id: number,
  updatedExercise: { exercise_name: string },
): Promise<Exercise[]> {
  const exerciseToUpdate: unknown = await connection('exercises')
    .where({ id })
    .update(updatedExercise)

  return exerciseToUpdate as Exercise[]
}
