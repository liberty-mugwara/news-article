import { config } from "dotenv";
config();
import express, {
  json as expressJson,
  urlencoded as expressUrlencoded,
} from "express";
import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";
import appRouter from "./router.js"

const app = express();
app.use(
  express.static("dist"),
  helmet(),
  cors(),
  expressJson(),
  expressUrlencoded({ extended: false }),
);

app.use("analyze",appRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(chalk.green(`App listening on port ${port}`));
  console.log(
    `${chalk.bold("App is being served at:")} ${chalk.yellow(
      `http://localhost:${port}/`
    )}`
  );
});
