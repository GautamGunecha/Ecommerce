const express = require("express");
const router = express.Router();
const { adminVerification } = require("../../middlewares/auth/auth");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProductId,
  getProducts,
} = require("../../controllers/products/productCtrl");

router.post("/addproduct", adminVerification, addProduct);
router.put("/editproduct/:id", adminVerification, editProduct);

router.delete("/deleteproduct/:id", adminVerification, deleteProduct);

router.get("/getproduct/:id", getProductId);
router.get("/", getProducts);

module.exports = router;
