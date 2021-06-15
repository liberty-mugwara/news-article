export const getHtml = (results) => {
  const score = {
    "P+": "strong positive",
    P: "positive",
    NEU: "neutral",
    N: "negative",
    "N+": "strong negative",
    NONE: "without sentiment",
  };

  let html = "";
  Object.entries(results).forEach(([key, value = ""]) => {
    html += `<div class="result"><span class="result-title">${
      key === "score_tag" ? "Score" : key[0].toUpperCase() + key.slice(1)
    }:</span> <span class="result-value">${
      key === "model"
        ? value.split("_")[0] + " english"
        : key === "score_tag"
        ? score[value]
        : value.toLowerCase()
    }</span></div>`;
  });
  return html;
};

export const updateUI = (data = {}) => {
  const results = document.getElementById("results");
  results.innerHTML = getHtml(data);
};
