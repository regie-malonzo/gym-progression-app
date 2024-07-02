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
      goal: 200,
      new_record: 90,
      note: 'Felt good today, can lift more',
    },
    {
      id: 2,
      exercise_id: 2,
      date_of_exercise: '02/02/2024',
      goal: 45,
      new_record: 15,
      note: 'can lift more',
    },
    {
      id: 3,
      exercise_id: 3,
      date_of_exercise: '02/02/2024',
      goal: 100,
      new_record: 55,
      note: 'comfortable weight, but probably do more next week',
    },
  ])
}
