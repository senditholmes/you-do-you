import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

// DATABASE
sqlite3.verbose();
const db = new sqlite3.Database(
  "/Users/djh/Projects/you-do-you-app/db/youdoyou.sql",
  (error) => {
    if (error) {
      console.log(`Database error occured on connecting: + ${error}`);
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
  db.serialize(() => {
    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
    });
    db.close((error) => {
      if (error) {
        console.log(`Database error occured on closing: ${error}`);
      } else {
        console.log("Database connection closed.");
      }
    });
  });

  res.status(200).send({ everything: "isokay" });
});

app.listen(PORT, () => {
  console.log(`You-do-you dev server available at: ${PORT}`);
});
