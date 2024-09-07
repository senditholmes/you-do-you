import { Router } from "express";
import { prepareUserData } from "./utils/authFuncs.js";
import { createJWT } from "./utils/authFuncs.js";
import bcrypt from "bcrypt";
import { checkIfUserExists, insertQuery } from "./utils/dbqueries.js";
import protect from "./utils/middleware/protect.js";
import { getUserById } from "./utils/dbqueries.js";

const auth = Router();

auth.post("/autologin", protect, async (req, res) => {
  const user = await getUserById(req.verifiedCookie.id);
  if (user) {
    res.send({
      success: true,
      message: "User verified and logged in",
      user,
    });
  } else {
    res.send({
      success: false,
      message: "Unable to auto-login, please login manually",
    });
  }
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

auth.post("/manualLogin", async (req, res) => {
  const userToValidate = req.body;
  const userInDatabase = await checkIfUserExists(userToValidate);

  if (userInDatabase) {
    const userValidated = await bcrypt.compare(
      userToValidate.password,
      userInDatabase.PasswordHash
    );

    if (userValidated) {
      const token = createJWT(userInDatabase);
      res
        .status(200)
        .cookie("access_token", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .send({
          success: true,
          message: "User signed in successfully.",
          userInDatabase,
        });
    }
  } else {
    res.send({ success: false, message: "Invalid Credentials" });
  }
});

auth.post("/logout", protect, (req, res) => {
  res
    .clearCookie("access_token", { path: "/" })
    .status(200)
    .send({ success: true, message: "Cookie cleared, please login again." });
});

export default auth;
