require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to OAuth API Server</h1>`);
});
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

app.get("/auth/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
