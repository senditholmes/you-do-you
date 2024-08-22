import express from "express";
import cors from "cors";
import prepareUserForInsert from "./helpers/auth.js";
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
  const sanitzedUser = await prepareUserForInsert(req.body);
  const isInDatabase = await checkIfUserExists(sanitzedUser);

  if (!isInDatabase) {
    const insertResult = await insertQuery(sanitzedUser);
    if (insertResult) {
      res.status(200).send({ message: "User added successfully." });
    }
  } else {
    res.status(500).send({ message: "Unable to add user." });
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
