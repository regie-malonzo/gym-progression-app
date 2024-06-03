/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('records').del()
  await knex('records').insert([
    {
      id: 1,
      exercise_id: 1,
      date_of_exercise: '02/02/2024',
      initial_record: 80,
      new_record: null,
      note: '',
    },
    {
      id: 2,
      exercise_id: 2,
      date_of_exercise: '02/02/2024',
      initial_record: 12,
      new_record: null,
      note: '',
    },
    {
      id: 3,
      exercise_id: 3,
      date_of_exercise: '02/02/2024',
      initial_record: 50,
      new_record: null,
      note: '',
    },
  ])
}
