import { Router } from "express";
import {
  getUser,
  logUserIn,
  signUserUp,
} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .get("/", authMiddleware, getUser)
  .post("/login", logUserIn)
  .post("/signup", signUserUp);

export default router;
