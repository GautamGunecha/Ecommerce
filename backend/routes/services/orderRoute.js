const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrder,
  getOrder,
  deleteOrder,
  getAllOrder,
  getMonthlyIncome,
} = require("../../controllers/services/OrderCtrl");
const { protect, adminVerification } = require("../../middlewares/auth/auth");

router.post("/placed", protect, createOrder);
router.put("/update/:id", protect, updateOrder);
router.delete("/delete/:id", protect, deleteOrder);
router.get("/find/:userId", protect, getOrder);

// Admin route
router.get("/", adminVerification, getAllOrder);
router.get("/income", adminVerification, getMonthlyIncome);

module.exports = router;
