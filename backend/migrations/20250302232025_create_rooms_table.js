/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("rooms", function (table) {
    table.increments("roomid").primary();
    table.string("roomname").notNullable();
    table.decimal("roomprice", 10, 2).notNullable();
    table.text("roomdescription").notNullable();
    table.string("pictureurl");
    table.string("roomurl");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("rooms");
};
