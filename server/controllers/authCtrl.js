require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    // COLLECT ALL INFORMATION FRONTEND REQ_BODY
    const { name, email, password } = req.body;
    // Validate All fields, If presents
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "missing required fields" });
    }
    // Check if Already exits user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please Login" });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // SAVE TO DB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Register successfullly", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error });
  }
};
exports.signin = async (req, res) => {
  try {
    // COLLECT ALL INFORMATION REQ.BODY
    const { email, password } = req.body;
    // BRING EXISTING USER TO GO FORWORD
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    // MATCH PASSWORD FROM DB
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    // TIME TO CREATE TOKEN
    const token = await jwt.sign(
      { userId: user._id, role: "admin", name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
    );
    res.status(201).json({
      success: true,
      message: "Login Successful",
      token,
      user: user.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while login",
      error: error,
    });
  }
};
