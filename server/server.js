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
    res.status(200).send({
      result: `User id: ${insertResult}: ${Object.values(
        sanitzedUser
      )} successfully added.`,
    });
  } else if (isInDatabase) {
    res.status(500).send({
      result: `Failed to add user ${Object.values(
        sanitzedUser
      )} as they are already in the database.`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
