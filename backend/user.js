import { Router } from "express";
import dotenv from "dotenv";
import { getUserById } from "./utils/dbqueries.js";
import protect from "./utils/middleware/protect.js";
dotenv.config();

// ROUTER
const user = Router();

// ROUTE
user.post("/getUser", protect, async (req, res) => {
  const user = await getUserById(req.verifiedCookie.id);
  delete user.PasswordHash;
  res.status(200).send(user);
});

export default user;
