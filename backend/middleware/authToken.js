const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        success: false,
        error: true
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token",
          success: false,
          error: true
        });
      }

      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
      data: []
    });
  }
}

module.exports = authToken;
