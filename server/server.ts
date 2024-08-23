import express from "express";
import cors from "cors";
import { prepareUserData, validateUser } from "./helpers/auth.js";
import { insertQuery, checkIfUserExists } from "./helpers/dbqueries.js";

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
  const isInDatabase = await checkIfUserExists(sanitzedUser);

  if (!isInDatabase) {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      res.status(200).send({ message: "User added successfully." });
    }
  } else if (isInDatabase) {
    res.status(500).send({ message: "User already registered!" });
  }
});

app.post("/login", async (req, res) => {
  const sanitzedUser = await prepareUserData(req.body, "login");
  const isInDatabase = await checkIfUserExists(sanitzedUser);

  if (!isInDatabase) {
    res
      .status(500)
      .send({ message: "Sorry, you are not yet registered. Please sign up!" });
  } else if (isInDatabase) {
    const validateUserResult = await validateUser(sanitzedUser);
    if (validateUserResult) {
      res.status(200).send({ message: "Validation successful!" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
