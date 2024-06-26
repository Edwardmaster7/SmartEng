exports.up = function (knex) {
  return knex.schema.createTable("Buildings", function (table) {
    table.increments("id").primary();
    table.string("name").notNull();
    table.bigInteger("client_id").notNull().references("id").inTable("Clients");
    table.string("category").notNull();
    table.string("address").notNull();
    table.string("city").notNull();
    table.string("state").notNull();
    table.date("start_forecast");
    table.integer("projected_area").notNull();
    table.integer("built_area").notNull();
    table.integer("land_area").notNull();
    table.dateTime("created_at").notNull().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNull().defaultTo(knex.fn.now());
  });
};

exports.down =  (knex)  => knex.schema.dropTable("buildings");

