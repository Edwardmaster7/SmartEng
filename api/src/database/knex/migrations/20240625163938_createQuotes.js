exports.up = function (knex) {
  return knex.schema.createTable("Quotes", function (table) {
    table.increments("id").primary();
    table.bigInteger("building_id").notNull().references("id").inTable("Buildings");
    table.bigInteger("owner_id").notNull().references("id").inTable("Users");
    table.float("labor_cost").notNull().defaultTo(0.0);
    table.float("material_cost").notNull().defaultTo(0.0);
    table.float("social_laws_cost").notNull().defaultTo(0.0);
    table.float("social_charges").notNull().defaultTo(0.0);
    table.float("bdi").notNull().defaultTo(0.0);
    table.float("total_building").notNull().defaultTo(0.0);
    table.float("total").notNull().defaultTo(0.0);
    table.text("updated_by").references("id").inTable("Users");
    table.dateTime("created_at").notNull().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNull().defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => knex.schema.dropTable("Quotes");
