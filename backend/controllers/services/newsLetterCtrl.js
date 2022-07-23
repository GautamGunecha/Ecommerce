const newsLetter = require("../../models/services/newsLetter");
const asyncHandler = require("express-async-handler");
const subscriptionMail = require("./subscriptionMail");

const { CLIENT_URL } = process.env;

const news = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: "Please enter your email" });

  const subscriber = await newsLetter.findOne({ email });
  if (subscriber)
    return res
      .status(400)
      .json({ msg: "You are already subscribed to our newsletter" });

  const user = new newsLetter({ email });
  await user.save();

  const url = `${CLIENT_URL}/unsubscribe/newsletter`;
  subscriptionMail(email, url, "To unsubscribe click here!");

  return res
    .status(200)
    .json({ msg: "Thank You for subscribing our news letter" });
});

const unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Please enter your email" });

  const subscriber = await newsLetter.findOne({ email });
  if (!subscriber)
    return res.status(400).json({ msg: "You are not subscribed to our store" });

  await newsLetter.findOneAndDelete({ email });
  return res.status(200).json({ msg: "Email unsubscribed to Mantra store" });
});

module.exports = { news, unsubscribe };
