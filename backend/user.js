import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const user = Router();

function protect(req, res, next) {
  console.log("Protecc an Attacc");
  next();
}

user.post("/getUser", protect, (req, res) => {
  console.log(req.cookies);
  res.send("Where are my cookies?");
});

export default user;
