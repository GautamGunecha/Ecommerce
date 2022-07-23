const express = require("express");
const router = express.Router();
const paymentMethod = require("../../controllers/payment/payment");
const { protect } = require('../../middlewares/auth/auth')

router.post("/", protect, paymentMethod);

module.exports = router;
