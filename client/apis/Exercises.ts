import request from 'superagent'
import { Exercise, ExerciseData } from '../../models/exercises'

const rootUrl = '/api/v1/'

export async function getExercises(): Promise<Exercise[]> {
  const response = await request.get(rootUrl + 'exercises')
  return response.body
}

export async function getExercisesById(id: number): Promise<Exercise> {
  const response = await request.get(`${rootUrl}exercises/${id}`)
  return response.body
}

export async function addExercise(exercise: ExerciseData): Promise<void> {
  await request.post(rootUrl + `exercises`).send(exercise)
}

export async function updateExercise(
  id: number,
  exercise: ExerciseData,
): Promise<void> {
  await request.patch(`${rootUrl}exercises/${id}`).send(exercise)
}

export async function deleteExercise(id: number): Promise<void> {
  await request.delete(`${rootUrl}exercises/${id}`)
}
