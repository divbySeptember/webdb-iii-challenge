const express = require("express");
const helmet = require("helmet");

const cohortRouter = require("../controllers/cohort-router.js");
const studentRouter = require("../controllers/student-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cohorts", cohortRouter);
server.use("/api/students", studentRouter);

module.exports = server;
