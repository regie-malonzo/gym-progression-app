export interface Exercise {
  id: number
  exercise_name: string
}

export interface Record {
  id: number
  exercise_id: number
  date_of_exercise: string
  goal: number
  new_record: number
  note: string
  goal_unit: string
  record_unit: string
}

export type RecordData = Omit<Record, 'id'>
export type ExerciseData = Omit<Exercise, 'id'>
