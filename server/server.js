import express, { urlencoded } from "express";
import cors from "cors";

import { prepareUserData } from "./helpers/auth.js";
import { insertQuery, checkIfUserExists } from "./helpers/dbqueries.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const PORT = process.env.PORT;

// APP
const app = express();

// MIDDLEWARE
app.use(express.text(), express.json());
app.use(cors());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

// INDEX
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  const sanitzedUser = await prepareUserData(req.body, "signup");
  const userInDatabase = await checkIfUserExists(sanitzedUser);

  if (userInDatabase) {
    res.status(500).send({ error: "User already registered!" });
  } else {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      res.status(200).send({ success: "User added successfully." });
    }
  }
});

app.post("/login", async (req, res) => {
  const userToValidate = req.body;
  const userInDatabase = await checkIfUserExists(userToValidate);
  const userValidated = await bcrypt.compare(
    userToValidate.password,
    userInDatabase.PasswordHash
  );

  if (userValidated) {
    jwt.sign(
      {
        id: userInDatabase.UserID,
        username: userInDatabase.Username,
        email: userInDatabase.Email,
      },
      process.env.JWT_SECRET,
      {},
      (error, token) => {
        if (error) throw error;
        console.log(token);
        res.cookie("token", token).send("Success");
      }
    );
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
