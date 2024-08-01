/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable('workouts', (table) => {
    table.increments('id').primary()
    table.integer('users_id').references('id').inTable('users')
    table.float('lifted_weight') //weight lifted
    table.integer('reps') //number of reps
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('workouts')
}
