import { Router } from "express";
import chalk from "chalk";
import axios from "axios";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const url = req.body.url;
    if (!API_KEY)
      throw new Error(
        "API_KEY is required, make sure you define and set it in the .env file"
      );
    const response = await axios.post(
      `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}?url=${url}?`
    );

    if (response) {
      res.json(response.data);
    }
  } catch (err) {
    console.log(chalk.red.bold("Error:"), chalk.yellow(err.message));
    console.error(error);
    throw err;
  }
});

export default router;
