const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("hello");
});

app.listen(5001, () => {
  console.log("port listing in 5001");
});
