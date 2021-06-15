import { getHtml } from "../js/update-ui";
import { config } from "../js/config.js";
import htmlValidator from "html-validator";
import axios from "axios";

test("getHtml returns valid html", async () => {
  const { data } = await axios.get(`${config.apiBaseUrl}/mock/analyze/ok`);
  const { isValid, errorCount, warningCount } = await htmlValidator({
    validator: "WHATWG",
    data: getHtml(data),
    isFragment: true,
  });

  expect({ isValid, errorCount, warningCount }).toMatchObject({
    isValid: true,
    errorCount: 0,
    warningCount: 0,
  });
});
