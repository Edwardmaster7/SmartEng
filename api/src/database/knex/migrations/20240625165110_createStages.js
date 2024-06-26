exports.up = function (knex) {
  return knex.schema.createTable("Stages", function (table) {
    table.increments("id").primary();
    table.bigInteger("quote_id").notNull();
    table.bigInteger("name").notNull();

    // Add foreign key constraint for quote_id
    table.foreign("quote_id").references("id").inTable("Quotes");
  });
};

exports.down = (knex) => knex.schema.dropTable("Stages");