const router = require("express").Router();
const db = require("../config/knexConfig.js");

router.get("/", async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const studentInfo = await db("students")
      .where("students.id", id)
      .join("cohorts", "cohorts.id", "students.cohort_id")
      .select("students.id", "students.name", "cohorts.name as cohort");

    if (studentInfo) {
      res.status(200).json(studentInfo);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { name, cohort_id } = req.body;
  if (!name || !cohort_id) {
    return res.status(400).json({
      message: "Please provide a name and cohort id for this student."
    });
  }
  try {
    const [id] = await db("students").insert(req.body);
    const student = await db("students")
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cohort_id } = req.body;

  if (!name && !cohort_id) {
    return res.status(400).json({
      message: "Please provide a name and cohort id for this student."
    });
  }

  try {
    const count = await db("students")
      .where({ id })
      .update(req.body);

    if (count > 0) {
      const student = await db("students")
        .where({ id })
        .first();
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("students")
      .where({ id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
