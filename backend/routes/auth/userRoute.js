const router = require("express").Router();
const {
  register,
  login,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  deleteAccount,
} = require("../../controllers/auth/userCtrl");

const { protect } = require("../../middlewares/auth/auth");
const reset = require("../../middlewares/auth/reset");

router.post("/register", register);
router.post("/login", login);
router.post("/profile", protect, updateUserProfile);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", reset, resetPassword);

router.delete("/delete/:id", protect, deleteAccount);

module.exports = router;
