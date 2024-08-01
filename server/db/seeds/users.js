/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'Alice', weight: 70 },
    { id: 2, name: 'Bob', weight: 96 },
    { id: 3, name: 'Charlie', weight: 85 },
  ])
}
