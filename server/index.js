const express = require("express");
const { readFileSync } = require("fs");
const { resolve } = require("path");

const app = express();

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-methods", "GET,POST");
  next();
});

app.get("/images/:filename", (req, res) => {
  res.sendFile(resolve(__dirname, "./images/" + req.params.filename));
});

app.get("/imgs", (req, res) => {
  const imgData = JSON.parse(
    readFileSync(resolve(__dirname, "./data/images.json"))
  );
  res.send(imgData);
});

app.listen("8888", () => {
  console.log("listening 8888");
});
