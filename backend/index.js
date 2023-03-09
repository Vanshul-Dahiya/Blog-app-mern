import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";

const PORT = 8000;

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hehe");
  console.log("heheh");
});

app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);
