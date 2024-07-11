/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.table('records', function (table) {
    table.string('goal_unit').defaultTo('kg') // Add the unit column with a default value
    table.string('record_unit').defaultTo('kg')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.table('records', function (table) {
    table.dropColumn('goal_unit') // Rollback: remove the unit column
    table.dropColumn('record_unit') // Rollback: remove the unit column
  })
}
