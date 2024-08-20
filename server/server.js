import express from "express";

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.text(), express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
  console.log(req);
  res.status(200).send("We workin lads.");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
