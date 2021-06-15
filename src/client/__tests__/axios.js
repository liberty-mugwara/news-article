import axios from "axios";
import { config } from "../js/config.js";

test("axios successfully performs a get request to server", async () => {
  const response = await axios.get(`${config.apiBaseUrl}/mock/analyze/ok`);
  expect(response.status).toBe(200);
});

test("axios successfully performs a post request to server", async () => {
  const response = await axios.post(`${config.apiBaseUrl}/mock/analyze/ok`, {
    test: "Hey",
  });
  expect(response.status).toBe(200);
});

test("axios correctly throws on server error", async () => {
  try {
    await axios.get(`${config.apiBaseUrl}/mock/analyze/error`);
    // below code should not be executed on a successful throw
    expect(true).toBe(undefined);
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});
