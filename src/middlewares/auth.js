const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Extract token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Authentication token not found" });
    }

    // Verify token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET || "Harsh#999");//Takes 2 parameter i.e token and secret key

    const { _id } = decodedObj;

    // Find user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object    !!! imp attaching user to req method
    req.user = user;
    next();
  } catch (err) {
    // Handle token-specific errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    // General error handling
    res.status(400).json({ message: "Authentication failed: " + err.message });
  }
};

module.exports = { userAuth };
