exports.up = (knex) =>
  knex.schema.createTable("Clients", (table) => {
    table.increments("id").primary();
    table.text("name").notNull();
    table.text("email").notNull().unique();
    table.integer("owner_id").references("id").inTable("Users");
    table.integer("phone");
    table.text("address");
    table.text("city");
    table.text("state");
    table.text("zip_code");
    table.text("updated_by").references("id").inTable("Users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("Clients");
