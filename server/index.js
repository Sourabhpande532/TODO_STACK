require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", require("./routes/auth"));

// MONGO CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error(error));

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
