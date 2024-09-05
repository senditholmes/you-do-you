import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import auth from "./auth.js";
import user from "./user.js";
dotenv.config();
const app = express();

//GLOBAL VARS
const PORT = process.env.PORT;

// MIDDLEWARE
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.text(), express.json());
app.use(urlencoded({ extended: true }));

// ROUTERS
app.use("/auth", auth);
app.use("/user", user);

// INDEX
app.get("/", (req, res) => {
  res.status(200);
  console.log("Index accessed.");
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
