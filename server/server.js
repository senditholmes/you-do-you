import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.text(), express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
  console.log("received");

  res.status(200).send({ objectify: "me" });

  console.log("finished");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
