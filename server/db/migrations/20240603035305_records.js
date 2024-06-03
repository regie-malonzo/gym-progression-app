/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('records', (table) => {
    table.increments('id')
    table.integer('exercise_id')
    table.string('date_of_exercise')
    table.integer('initial_record')
    table.integer('new_record')
    table.string('note')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('records')
}
