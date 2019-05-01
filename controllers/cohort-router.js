const router = require("express").Router();
const db = require("../config/knexConfig.js");

router.get("/", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/students", async (req, res) => {
  const { id } = req.params;
  try {
    const cohortStudents = await db("students").where({ cohort_id: id });
    if (cohortStudents.length > 0) {
      res.status(200).json(cohortStudents);
    } else {
      res
        .status(404)
        .json({ message: "There are no students in this cohort." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for this cohort." });
  }
  try {
    const [id] = await db("cohorts").insert(req.body);
    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("cohorts")
      .where({ id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id })
        .first();
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("cohorts")
      .where({ id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
