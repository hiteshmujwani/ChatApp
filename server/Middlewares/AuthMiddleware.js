import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ msg: "Invalid User" });
        }
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Session expired" });
        }
        return res.status(500).json({ msg: "Internal Server Error" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log("Error in verifyToken middleware:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
