import express from "express";
import cors from "cors";
import { prepareUserData } from "./helpers/auth.js";
import { insertQuery, checkIfUserExists } from "./helpers/dbqueries.js";
import bcrypt from "bcrypt";

// DATABASE

// APP
const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.text(), express.json());
app.use(cors());

// INDEX
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  const sanitzedUser = await prepareUserData(req.body, "signup");
  const userInDatabase = await checkIfUserExists(sanitzedUser);

  if (!userInDatabase) {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      res.status(200).send({ message: "User added successfully." });
    }
  } else if (userInDatabase) {
    res.status(500).send({ message: "User already registered!" });
  }
});

app.post("/login", async (req, res) => {
  const userToValidate = req.body;
  const userInDatabase = await checkIfUserExists(userToValidate);

  const userValidated = await bcrypt.compare(
    userToValidate.password,
    userInDatabase.PasswordHash
  );
  console.log(userValidated);
  if (userValidated) {
    res.status(200).send({ message: "User logged in successfully" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
