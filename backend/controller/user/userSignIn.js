const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { emailOrNumber, password } = req.body;

    if (!emailOrNumber) {
      return res.status(400).json({ success: false, message: "Please provide email or phone number" });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: "Please provide password" });
    }

    let user;

    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailOrNumber);

    if (isEmail) {
      user = await userModel.findOne({ email: emailOrNumber });
    } else {
      user = await userModel.findOne({ number: emailOrNumber });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const tokenOptions = {
        httpOnly: true,
        secure: true
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

      res.cookie("token", token, tokenOptions).json({
        message: "Login successful",
        data: token,
        success: true,
        error: false
      });

    } else {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    });
  }
}

module.exports = userSignInController;
