import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function saveFeedback(filePath, newData) {
  fs.writeFileSync(filePath, JSON.stringify(newData));
}

function handler(req, res) {
  if (req.method === "POST") {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    const newData = [...data, newFeedback];

    saveFeedback(filePath, newData);

    res.status(201).json({
      message: "Saved",
      feedback: newFeedback,
    });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    res.status(200).json({
      data,
    });
  }
}

export default handler;
