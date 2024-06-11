import connection from './connection.ts'
import { Exercise, Record } from '../../models/exercises.ts'

export async function getAllExercises(): Promise<Exercise[]> {
  return await connection('exercises').select('id', 'exercise_name')
}

export async function getExerciseById(id: number) {
  return await connection('exercises').where({ id }).first()
}

export async function addNewExercise(newExercise: Exercise) {
  await connection('exercises').insert(newExercise)
}

export async function updateExerciseById(
  id: number,
  updatedExercise: { exercise_name: string },
): Promise<Exercise[]> {
  const exerciseToUpdate: unknown = await connection('exercises')
    .where({ id })
    .update(updatedExercise)

  return exerciseToUpdate as Exercise[]
}

export async function deleteExerciseById(id: number) {
  return await connection('exercises').where({ id }).del()
}

//Records functions for routes

export async function getAllRecords(): Promise<Record[]> {
  return await connection('records').select('')
}

export async function getRecordsByExerciseId(
  exercise_id: number,
): Promise<Record[]> {
  return await connection('records')
    .join('exercises', 'exercises.id', 'records.exercise_id')
    .where('exercise_id', exercise_id)
    .select('exercise_name', 'goal', 'date_of_exercise', 'new_record', 'note')
    .first()
}

export async function addNewRecordsByExerciseId(
  newRecord: Record,
): Promise<number> {
  const { goal, new_record, date_of_exercise, note, exercise_id } = newRecord
  const exerciseId = Number(exercise_id)
  if (isNaN(exerciseId)) {
    throw new Error('invaild exercise_id')
  }
  const [newRecordId] = await connection('records')
    .insert({ goal, new_record, date_of_exercise, note, exercise_id })
    .returning('id')
  return newRecordId
}
