/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("userid").primary();
    table.string("firstname").notNullable();
    table.string("surname").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.boolean("isadmin").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
