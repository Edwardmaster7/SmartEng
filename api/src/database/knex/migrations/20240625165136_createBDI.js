exports.up = function (knex) {
  return knex.schema.createTable("BDI", function (table) {
    table.increments("id").primary();
    table.bigInteger("quote_id").notNull();

    // Add foreign key constraint for quote_id
    table.foreign("quote_id").references("id").inTable("Quotes");
  });
};

exports.down = (knex) => knex.schema.dropTable("BDI");