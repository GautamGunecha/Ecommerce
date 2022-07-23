const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsLetterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News Letter", newsLetterSchema);
