import request from 'superagent'

const rootUrl = '/api/v1/'

export async function getExercises(): Promise<string[]> {
  const response = await request.get(rootUrl + 'exercises')
  return response.body
}
