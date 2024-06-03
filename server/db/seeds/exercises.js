/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('exercises').del()
  await knex('exercises').insert([
    { id: 1, exercise_name: 'deadlift' },
    { id: 2, exercise_name: 'shoulder press' },
    { id: 3, exercise_name: 'bench press' },
  ])
}
