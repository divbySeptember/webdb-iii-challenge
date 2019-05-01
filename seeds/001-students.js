exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Arshak", cohort_id: 3 },
        { id: 2, name: "Sem", cohort_id: 3 },
        { id: 3, name: "Shaun", cohort_id: 3 }
      ]);
    });
};
