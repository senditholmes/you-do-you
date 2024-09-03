import { Router } from "express";
import { prepareUserData } from "./utils/authFuncs.js";
import { createJWT } from "./utils/authFuncs.js";
import bcrypt from "bcrypt";
import { checkIfUserExists, insertQuery } from "./utils/dbqueries.js";

const auth = Router();

auth.get("/", async (req, res) => {
  console.log("Auth route acessed");
  res.send("Auth Route Accessed");
});

auth.post("/signup", async (req, res) => {
  const sanitzedUser = await prepareUserData(req.body, "signup");
  const userInDatabase = await checkIfUserExists(sanitzedUser);

  if (userInDatabase) {
    res.status(500).send({ success: false, error: "User already registered!" });
  } else {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      res
        .status(200)
        .send({ success: true, message: "User added successfully." });
    }
  }
});

auth.post("/login", async (req, res) => {
  const userToValidate = req.body;
  const userInDatabase = await checkIfUserExists(userToValidate);

  if (userInDatabase) {
    const userValidated = await bcrypt.compare(
      userToValidate.password,
      userInDatabase.PasswordHash
    );

    if (userValidated) {
      const token = createJWT(userInDatabase);
      const user = {
        firstName: userInDatabase.FirstName,
        lastName: userInDatabase.LastName,
        userName: userInDatabase.Username,
        email: userInDatabase.Email,
      };
      res
        .status(200)
        .cookie("access_token", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .send({
          success: true,
          message: "User signed in successfully.",
          user,
        });
    }
  } else {
    res.send({ success: false, message: "Invalid Credentials" });
  }
});

auth.post("/logout", (req, res) => {
  console.log(req, res);
});

export default auth;
