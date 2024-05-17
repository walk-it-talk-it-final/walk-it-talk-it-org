const express = require("express");
const router = express.Router();
const projectRouter = require("./project");
const { join } = require("../controllers/auth");
const { verifyToken } = require("../middlewares");
const passport = require("passport");

// POST /api/auth/join
router.post("/auth/join", join);

// POST /api/projects
router.use("/projects", projectRouter);

module.exports = router;
