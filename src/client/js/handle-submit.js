import axios from "axios";
import { config } from "./config.js";
import { isValidUrl } from "./validations.js";
import { updateUI } from "./update-ui.js";

export const handleSubmit = async (event) => {
  const formError = document.getElementById("form-error");

  try {
    event.preventDefault();

    const url = document.getElementById("url").value;
    if (!isValidUrl(url)) {
      formError.textContent = "Enter a valid URL";
      formError.classList.remove("hidden");
      return;
    }

    formError.classList.add("hidden");
    const response = await axios.post(
      `${config.apiBaseUrl}/analyze`,
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      updateUI(response.data);
    }
  } catch (err) {
    formError.textContent = "Sorry! your request could not be processed";
    formError.classList.remove("hidden");
  }
};
