exports.up = function(knex) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();

    tbl.string("name", 128).notNullable();

    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("students");
};
