require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "./logs/log.txt");
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file", err);
    return;
  }
  // console.log("file content:\n");
  // console.log(data);
});
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const dns = require("dns");
const logMessage = require("./logs/logger");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", require("./routes/auth"));

// MONGO CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    // logMessage("INFO", "DB CONNECTED");
  })
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to OAuth API Server</h1>`);
});
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

app.get("/auth/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user,repo,security_events`;
  // IF Somebudy call this routes redirect in this url
  res.redirect(githubAuthUrl);
});

app.get("/auth/me", (req, res) => {
  const token = req.cookies?.access_asana_token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({ authenticated: true });
});

app.get("/auth/github/callback", async (req, res) => {
  // This `code` we need to replace with our accesstoken..
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code not provided");
  }
  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      },
    );
    const accessToken = tokenResponse.data.access_token;
    res.cookie("access_asana_token", accessToken);
    return res.redirect(`${process.env.FRONTEND_URL}`);
    console.log(accessToken);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // logMessage("INFO", "SERVER STARTED AT PORT 5001");
});
