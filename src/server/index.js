import { config } from "dotenv";
config();
import express, { static, json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(
  static("build"),
  helmet(),
  cors(),
  json(),
  urlencoded({ extended: false })
);

console.log("api key is: " + process.env.API_KEY);
