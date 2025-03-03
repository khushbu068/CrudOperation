const jwt = require("jsonwebtoken");
const CrudUser = require("../model/crudUser");

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, "secret");
    console.log("Decoded Token:", decoded);

    const user = await CrudUser.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Attach user object to req
    console.log("Fetched User:", req.user); // Debugging
    next();
  } catch (err) {
    console.error("Middleware Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

module.exports = { userMiddleware };
