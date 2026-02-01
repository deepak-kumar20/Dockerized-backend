const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h2>Hello .</h2>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
