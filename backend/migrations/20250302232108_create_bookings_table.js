/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bookings", function (table) {
    table.increments("bookingid").primary();
    table.integer("userid").unsigned().notNullable();
    table.string("firstname").notNullable();
    table.integer("roomid").unsigned().notNullable();
    table.date("datestart").notNullable();
    table.date("dateend").notNullable();
    table.foreign("userid").references("users.userid").onDelete("CASCADE");
    table.foreign("roomid").references("rooms.roomid").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bookings");
};
