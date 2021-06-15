import { isValidUrl } from "../js/validations.js";

test("isValidUrl returns false when url is invalid", () => {
  const urls = [
    "ppt.ff//www.invalid.com",
    "www.me",
    "https.me.com",
    "we.are.great",
    "url",
  ];
  expect(urls.every((url) => isValidUrl(url) === false)).toBe(true);
});
