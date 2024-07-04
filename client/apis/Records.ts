import request from 'superagent'
import { Record, RecordData } from '../../models/exercises'

const rootUrl = '/api/v1'

export async function getRecords(): Promise<Record[]> {
  const response = await request.get(rootUrl + 'records')
  return response.body
}

export async function getRecordsByExerciseId(
  exercise_id: number,
): Promise<RecordData[]> {
  const response = await request.get(`${rootUrl}records/${exercise_id}`)
  return response.body
}

export async function addRecord(record: RecordData): Promise<void> {
  await request.post(rootUrl + 'records').send(record)
}

export async function updateRecord(
  id: number,
  record: RecordData,
): Promise<void> {
  await request.patch(`${rootUrl}records/${id}`).send(record)
}

export async function deleteRecord(id: number): Promise<void> {
  await request.delete(`${rootUrl}records/${id}`)
}
