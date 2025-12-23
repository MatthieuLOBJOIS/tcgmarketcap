import crypto from "crypto";
import express from "express";

const app = express();
const VERIFICATION_TOKEN = "my-ebay-verification-token-123";

app.use(express.json());

app.get("/ebay/account-deletion", (req, res) => {
  const challengeCode = req.query.challenge_code;

  if (!challengeCode) {
    return res.status(400).send("Missing challenge_code");
  }

  const hash = crypto
    .createHash("sha256")
    .update(challengeCode + VERIFICATION_TOKEN)
    .digest("hex");

  res.json({ challengeResponse: hash });
});

app.post("/ebay/account-deletion", (req, res) => {
  // Notification réelle (tu peux ignorer)
  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Server running"));
