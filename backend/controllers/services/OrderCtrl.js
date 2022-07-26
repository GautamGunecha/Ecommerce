const Order = require("../../models/services/OrderModel");
const asyncHandler = require("express-async-handler");

// Create Order
const createOrder = asyncHandler(async (req, res) =>
{
  const newOrder = new Order(req.body);

  try
  {
    const savedOrder = await newOrder.save();
    return res.status(200).json({ msg: savedOrder });
  } catch (err)
  {
    return res.status(500).json({ msg: err });
  }
});

// Update
const updateOrder = asyncHandler(async (req, res) =>
{
  try
  {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (err)
  {
    return res.status(500).json(err);
  }
});

// Delete Order
const deleteOrder = asyncHandler(async (req, res) =>
{
  try
  {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json("Order has been deleted...");
  } catch (err)
  {
    return res.status(500).json({ msg: err });
  }
});

// Get User Order
const getOrder = asyncHandler(async (req, res) =>
{
  try
  {
    const orders = await Order.find({ userId: req.params.userId });
    return res.status(200).json(orders);
  } catch (err)
  {
    return res.status(500).json(err);
  }
});

// Admin Controller
const getAllOrder = asyncHandler(async (req, res) =>
{
  try
  {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err)
  {
    return res.status(500).json(err);
  }
});

// Get monthly income
const getMonthlyIncome = asyncHandler(async (req, res) =>
{
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try
  {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return res.status(200).json({ msg: income });
  } catch (err)
  {
    res.status(500).json({ msg: err });
  }
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  getMonthlyIncome,
};
