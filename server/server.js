import express, { urlencoded } from "express";
import cors from "cors";

import { prepareUserData } from "./utils/auth.js";
import { createJWT } from "./utils/auth.js";
import { insertQuery, checkIfUserExists } from "./utils/dbqueries.js";

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// GLOBAL
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

// ROUTES
app.post("/signup", async (req, res) => {
  const sanitzedUser = await prepareUserData(req.body, "signup");
  const userInDatabase = await checkIfUserExists(sanitzedUser);

  if (userInDatabase) {
    res.status(500).send({ error: "User already registered!" });
  } else {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      const token = createJWT(userInDatabase);
      res.status(200).send({ token, success: "User added successfully." });
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
    // check if the token they have matches the one we would create
    const token = createJWT(userInDatabase);
    res.status(200).send({ token, success: "User signed in successfully." });
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
