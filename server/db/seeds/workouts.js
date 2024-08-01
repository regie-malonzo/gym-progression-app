/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('workouts').del()
  await knex('workouts').insert([
    { id: 1, users_id: 1, lifted_weight: 100, reps: 5 },
    { id: 2, users_id: 2, lifted_weight: 200, reps: 5 },
    { id: 3, users_id: 3, lifted_weight: 150, reps: 5 },
  ])
}
