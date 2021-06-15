import { config } from "../js/config.js";
import axios from "axios";

test("api base url works and is correct", async () => {
  const response = await axios.get(`${config.apiBaseUrl}/mock`);
  expect(response.data?.server).toBe("mugs-sentiment-api-2021-udacity");
});
