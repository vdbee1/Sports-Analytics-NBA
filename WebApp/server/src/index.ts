import express from "express";
const PORT = 8080;
const app = express();
app.get("/", (req, res) => {
  return res.send("hello world");
});
app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});