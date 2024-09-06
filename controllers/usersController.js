import jwt from "jsonwebtoken";

// importing models
import User from "../models/User.js";

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", {
    expiresIn: "3d",
  });

export const getUser = async (req, res) => {
  const { email } = req.user;
  res.status(200).send(email);
};

export const signUserUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const logUserIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
