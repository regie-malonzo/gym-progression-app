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
      new_record: 90,
      note: 'Felt good today, can lift more',
    },
    {
      id: 2,
      exercise_id: 2,
      date_of_exercise: '02/02/2024',
      initial_record: 12,
      new_record: 15,
      note: 'can lift more',
    },
    {
      id: 3,
      exercise_id: 3,
      date_of_exercise: '02/02/2024',
      initial_record: 50,
      new_record: 55,
      note: 'comfortable weight, but probably do more next week',
    },
  ])
}
