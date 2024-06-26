exports.up = function (knex) {
  return knex.schema.createTable("quotes", function (table) {
    table.increments("id").unsigned().primary();
    table.bigInteger("building_id").notNull().references("id").inTable("Buildings");
    table.float("labor_cost", 53).notNull().defaultTo(0.0);
    table.float("material_cost", 53).notNull().defaultTo(0.0);
    table.float("social_laws_cost", 53).notNull().defaultTo(0.0);
    table.float("social_charges", 53).notNull().defaultTo(0.0);
    table.float("bdi", 53).notNull().defaultTo(0.0);
    table.float("total_building", 53).notNull().defaultTo(0.0);
    table.float("total", 53).notNull().defaultTo(0.0);
    table.dateTime("created_at").notNull().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNull().defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => knex.schema.dropTable("quotes");
