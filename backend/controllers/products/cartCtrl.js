const Cart = require("../../models/products/cartModel");
const asyncHandler = require("express-async-handler");

// Add to cart or create cart
const addToCart = asyncHandler(async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

// Update cartItems quantity
const updateCart = asyncHandler(async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

// delete cart items
const deleteCart = asyncHandler(async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Cart Deleted...");
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// Get UserCart
const userCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// admin controller
const adminCart = asyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = { addToCart, updateCart, deleteCart, userCart, adminCart };
