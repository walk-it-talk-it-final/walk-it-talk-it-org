const express = require("express");
const router = express.Router();

const {confirmPayment} = require('../controllers/toss.js');

router.post('/confirm', confirmPayment);

module.exports = router;
// http://localhost:3000/sandbox-dev/api/v1/payments/confirm