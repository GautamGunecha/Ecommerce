const express = require("express");
const router = express.Router();
const { protect, adminVerification } = require("../../middlewares/auth/auth");
const {
  addToCart,
  updateCart,
  deleteCart,
  userCart,
  adminCart,
} = require("../../controllers/products/cartCtrl");

router.post("/", protect, addToCart);
router.put("/:id", protect, updateCart);
router.delete("/:id", protect, deleteCart);
router.get("/find/:userId", protect, userCart);
router.get("/", adminVerification, adminCart);

module.exports = router;
