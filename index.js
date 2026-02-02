const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://Deepak:mypassword@mongo:27017/?authSource=admin')
  .then(()=>console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('Connection error', err));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h2>Hello Mongo started.</h2>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
