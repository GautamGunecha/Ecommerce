const jwt = require("jsonwebtoken");
const User = require("../../models/auth/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const adminVerification = asyncHandler(async (req, res, next) => {
  await protect(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("User not allowed!");
    }
  });
});

module.exports = { protect, adminVerification };
