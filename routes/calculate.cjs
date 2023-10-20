const express = require("express");
const { calculateLotSize } = require("../handlers/calculate-lot.cjs");
const router = express.Router();

router.route("/").post(calculateLotSize);

module.exports = router;
