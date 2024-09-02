import express, { urlencoded } from "express";
import cors from "cors";
import { prepareUserData } from "./utils/auth.js";
import { createJWT } from "./utils/auth.js";
import {
  insertQuery,
  checkIfUserExists,
  getUserById,
} from "./utils/dbqueries.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./router.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: [
    "set-cookie",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
  ],
};

// MIDDLEWARE
app.use(express.text(), express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// INDEX
app.get("/", (req, res) => {
  res.status(200);
  res.send({ message: "Index Served" });
});

app.use("/api", router);

// ROUTES
app.post("/signup", async (req, res) => {
  const sanitzedUser = await prepareUserData(req.body, "signup");
  const userInDatabase = await checkIfUserExists(sanitzedUser);

  if (userInDatabase) {
    res.status(500).send({ success: false, error: "User already registered!" });
  } else {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      const user = await getUserById(insertResult);
      const token = createJWT(user);
      res
        .status(200)
        .send({ token, success: true, message: "User added successfully." });
    }
  }
});

app.post("/login", async (req, res) => {
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
        .cookie("access_token", token, { maxAge: 100000, httpOnly: true })
        .send({
          success: true,
          message: "User signed in successfully.",
          user: user,
        });
    }
  } else {
    res.send({ success: false, message: "Invalid Credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
