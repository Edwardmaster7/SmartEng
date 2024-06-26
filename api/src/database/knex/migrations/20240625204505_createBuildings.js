exports.up = function (knex) {
  return knex.schema.createTable("Buildings", function (table) {
    table.increments("id").primary();
    table.string("name").notNull();
    table.bigInteger("client_id").notNull().references("id").inTable("Clients");
    table.bigInteger("owner_id").notNull().references("id").inTable("Users");
    table.string("category").notNull();
    table.string("address").notNull();
    table.string("city").notNull();
    table.string("state").notNull();
    table.text("zip_code").notNull();
    table.date("start_forecast");
    table.integer("projected_area").notNull();
    table.integer("built_area").notNull();
    table.integer("land_area").notNull();
    table.text("updated_by").references("id").inTable("Users");
    table.dateTime("created_at").notNull().defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => knex.schema.dropTable("Buildings");
