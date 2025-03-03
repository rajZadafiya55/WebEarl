import Jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decoded = Jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token!" });
  }
};

export { verifyToken };
