const router = require("express").Router();
const { adminVerification } = require("../../middlewares/auth/auth");
const {
  getAllUser,
  getUser,
  userStats,
} = require("../../controllers/auth/adminCtrl");

router.get("/find/:id", adminVerification, getUser);
router.get("/", adminVerification, getAllUser);
router.get("/user/stats", adminVerification, userStats);

module.exports = router;
