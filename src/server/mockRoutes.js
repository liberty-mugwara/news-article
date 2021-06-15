import { Router } from "express";

const router = Router();

// successful result
router.post("/analyze/ok", (_, res) => {
  res.json({
    agreement: "DISAGREEMENT",
    confidence: "100",
    irony: "IRONIC",
    model: "general_en",
    score_tag: "P+",
    subjectivity: "SUBJECTIVE",
  });
});

// unsuccessful result
router.post("/analyze/error", (_, res) => {
  res.status(500).json({ error: "could not process your request" });
});

export default router;
