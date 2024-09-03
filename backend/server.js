import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import auth from "./auth.js";
import user from "./user.js";
dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cookieParser());
const PORT = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(express.text(), express.json());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));

// ROUTERS
app.use("/auth", auth);
app.use("/user", user);

// INDEX
app.get("/", (req, res) => {
  res.send("Connected to backend.");
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
