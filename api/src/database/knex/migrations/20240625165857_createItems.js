exports.up = function (knex) {
  return knex.schema.createTable("Items", function (table) {
    table.increments("id").primary();
    table.bigInteger("stage_id").notNull();
    table.string("base").notNull();
    table.bigInteger("code").notNull();
    table.bigInteger("description").notNull();
    table.string("unit").notNull();
    table.integer("quantity").notNull();
    table.float("material_unit_cost").notNull();
    table.float("labor_unit_cost").notNull();
    table.float("total").notNull();

    // Add foreign key constraint for stage_id
    table.foreign("stage_id").references("id").inTable("Stages");
  });
};

exports.down = (knex) => knex.schema.dropTable("Items");