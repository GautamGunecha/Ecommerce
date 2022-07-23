const stripe = require("stripe");
const config = stripe(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");

const paymentMethod = asyncHandler(async (req, res) => {
  config.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
      description: "Payment Recieved!",
    },

    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return res.status(500).json(stripeErr);
      } else {
        return res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = paymentMethod;
