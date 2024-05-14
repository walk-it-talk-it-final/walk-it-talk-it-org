const express = require("express");
const router = express.Router();
const { join } = require("../controllers/auth");

// POST /api/auth/join
router.post("/auth/join", join);

module.exports = router;
