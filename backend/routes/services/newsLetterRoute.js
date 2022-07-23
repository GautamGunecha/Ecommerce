const express = require("express");
const router = express.Router();
const {
  news,
  unsubscribe,
} = require("../../controllers/services/newsLetterCtrl");

router.post("/subscribe", news);
router.post("/unsubscribe", unsubscribe);

module.exports = router;
