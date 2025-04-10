import connection from './connection'
import { Exercise, Record, RecordData } from '../../models/exercises'

// Exercises functions
export async function getAllExercises(): Promise<Exercise[]> {
  return await connection('exercises').select('id', 'exercise_name')
}

export async function getExerciseById(
  id: number,
): Promise<Exercise | undefined> {
  return await connection('exercises').where({ id }).first()
}

export async function addNewExercise(newExercise: Exercise): Promise<void> {
  await connection('exercises').insert(newExercise)
}

export async function updateExerciseById(
  id: number,
  updatedExercise: { exercise_name: string },
): Promise<void> {
  await connection('exercises').where({ id }).update(updatedExercise)
}

export async function deleteExerciseById(id: number): Promise<void> {
  await connection('exercises').where({ id }).del()
}

// Records functions
export async function getAllRecords(): Promise<Record[]> {
  return await connection('records').select('*')
}

export async function getRecordsByExerciseId(
  exercise_id: number,
): Promise<Record[]> {
  return await connection('records')
    .where('exercise_id', exercise_id)
    .select(
      'id',
      'exercise_id',
      'goal',
      'date_of_exercise',
      'new_record',
      'note',
      'goal_unit',
      'record_unit',
    )
}

export async function addNewRecordsByExerciseId(
  newRecord: RecordData,
): Promise<number> {
  const [newRecordId] = await connection('records')
    .insert(newRecord)
    .returning('id')
  return newRecordId
}

export async function updateRecordByExerciseId(
  exercise_id: number,
  updatedRecord: {
    goal: number
    new_record: number
    date_of_exercise: string
    note: string
    goal_unit: string
    record_unit: string
  },
): Promise<void> {
  await connection('records').where({ exercise_id }).update(updatedRecord)
}

export async function updateRecordById(
  id: number,
  updatedRecord: RecordData,
): Promise<void> {
  await connection('records').where({ id }).update(updatedRecord)
}

export async function deleteRecordById(id: number): Promise<void> {
  await connection('records').where({ id }).del()
}

//workout functions
export async function getAllWorkouts() {
  return await connection('workouts').select('*')
}

export async function getWorkoutById(id: number) {
  return await connection('workouts').where({ id }).first()
}

export async function addNewWorkout(newWorkout: {
  user_id: number
  lifted_weight: number
  reps: number
}) {
  await connection('workouts').insert(newWorkout)
}

export async function updateWorkoutById(
  id: number,
  updatedWorkout: { user_id: number; lifted_weight: number; reps: number },
) {
  await connection('workouts').where({ id }).update(updatedWorkout)
}

export async function deleteWorkoutById(id: number) {
  await connection('workouts').where({ id }).del()
}

//users function

export async function getAllUsers() {
  return await connection('users').select('*')
}

export async function getUserById(id: number) {
  return await connection('users').where({ id }).first()
}

export async function addNewUser(newUser: { name: string; weight: number }) {
  await connection('users').insert(newUser)
}

export async function updateUserById(
  id: number,
  updatedUser: { name: string; weight: number },
) {
  await connection('users').where({ id }).update(updatedUser)
}

export async function deleteUserById(id: number) {
  await connection('users').where({ id }).del()
}
