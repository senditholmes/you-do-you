import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

// DATABASE
sqlite3.verbose();
const db = new sqlite3.Database(
  "/Users/djh/Projects/you-do-you-app/db/youdoyou.db",
  (error) => {
    if (error) {
      console.log(`Error on connecting: + ${error.message}`);
    } else {
      console.log("Connected to database successfully.");
    }
  }
);

// APP
const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.text(), express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
  const userToInsert = { ...req.body };
  delete userToInsert.confirmPassword;
  userToInsert.createdAt = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  db.serialize(() => {
    db.run(
      "INSERT INTO Users (FirstName, LastName, Username, Email, PasswordHash, CreatedAt) VALUES ($firstName, $lastName, $username, $email, $password, $createdAt)",
      {
        $firstName: userToInsert.firstName,
        $lastName: userToInsert.lastName,
        $username: userToInsert.username,
        $email: userToInsert.email,
        $password: userToInsert.password,
        $createdAt: userToInsert.createdAt,
      },
      function (error) {
        if (error) {
          console.log(`Error on insertion: ${error.message}`);
          res.send({ userAdded: "Failed" });
        } else {
          console.log(
            `Insertion Successsful: Last Row Inserted: ${this.lastID}`
          );
          res.send({ userAdded: userToInsert });
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
