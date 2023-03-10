import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 8000;

dotenv.config();

const app = express();

// with help of body-parser , we can handle post api request
// no need in get , only post
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

app.get("/", (req, res) => {
  res.send("hehe");
  console.log("heheh");
});

app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
