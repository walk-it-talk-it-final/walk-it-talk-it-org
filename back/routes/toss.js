const express = require("express");
const router = express.Router();

const {confirmPayment} = require('../controllers/toss.js');

router.route('/confirm').get(confirmPayment);

module.exports = router;
