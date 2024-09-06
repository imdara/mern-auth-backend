import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const { _id } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "secretkey"
    );
    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default authMiddleware;
