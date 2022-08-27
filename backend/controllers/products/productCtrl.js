const Product = require("../../models/products/ProductModel");
const asyncHandler = require("express-async-handler");

// Create a Product
const addProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ msg: "Product Updated Success!" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

const getProductId = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProductId,
  getProducts,
};
