import { config } from "dotenv";
import axios from "axios";
config();
import express, {
  json as expressJson,
  urlencoded as expressUrlencoded,
} from "express";
import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";

const apiData = {};

const app = express();
app.use(
  express.static("dist"),
  helmet(),
  cors(),
  expressJson(),
  expressUrlencoded({ extended: false })
);

app.post("/analyze", analyze);

async function analyze(req, res) {
  try {
    const API_KEY = process.env.API_KEY;
    const url = req.body.url;
    if (!API_KEY)
      throw new Error(
        "API_KEY is required, make sure you define and set it in the .env file"
      );

    // Don't waste tokens
    if (apiData[url]) return res.json(apiData[url]);

    const response = await axios.post(
      `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&of=json&url=${url}&lang=en`
    );

    if (response) {
      // Save response locally
      if (response.data.status?.code === "0") {
        const { model, agreement, confidence, irony, subjectivity, score_tag } =
          response.data;

        const toClient = {
          model,
          agreement,
          confidence,
          irony,
          subjectivity,
          score_tag,
        };
        apiData[url] = toClient;
        return res.json(toClient);
      }
      res.status(500).json({ error: "could not process your request" });
    }
  } catch (err) {
    console.log(chalk.red.bold("Error:"), chalk.yellow(err.message));
    console.error(err);
    res.status(500).json({ error: "could not process your request" });
  }
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(chalk.green(`App listening on port ${port}`));
  console.log(
    `${chalk.bold("App is being served at:")} ${chalk.yellow(
      `http://localhost:${port}/`
    )}`
  );
});
