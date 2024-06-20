exports.up = (knex) =>
  knex.schema.createTable("Users", (table) => {
    table.increments("id").primary();
    table.text("name").notNull();
    table.text("email").notNull().unique();
    table.text("password").notNull();
    table.text("avatar").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("Users");
