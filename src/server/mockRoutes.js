import { Router } from "express";

const router = Router();

const data = {
  agreement: "DISAGREEMENT",
  confidence: "100",
  irony: "IRONIC",
  model: "general_en",
  score_tag: "P+",
  subjectivity: "SUBJECTIVE",
};

router.get("/", (_, res) => {
  res.json({ server: "mugs-sentiment-api-2021-udacity" });
});

// successful post result
router.post("/analyze/ok", (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(500).json({ error: "no post data provided" });
  }
  res.json(data);
});

router.get("/analyze/ok", (_, res) => {
  res.json(data);
});

// unsuccessful result
router.post("/analyze/error", (_, res) => {
  res.status(500).json({ error: "could not process your request" });
});

router.get("/analyze/error", (_, res) => {
  res.status(500).json({ error: "could not process your request" });
});

export default router;
