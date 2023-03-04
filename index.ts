import express from "express";

const app = express();

app.use("/", (req, res) => {
  return res.json("Hello from Food order Backend!!");
});

app.listen(8000, () => {
  console.log("App is listening to the port 8000");
});
