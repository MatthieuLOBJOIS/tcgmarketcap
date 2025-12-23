import crypto from "crypto";

const VERIFICATION_TOKEN = "my-ebay-verification-token-123";

export default function handler(req, res) {
  if (req.method === "GET") {
    const challengeCode = req.query.challenge_code;
    if (!challengeCode) return res.status(400).send("Missing challenge_code");

    const hash = crypto
      .createHash("sha256")
      .update(challengeCode + VERIFICATION_TOKEN)
      .digest("hex");

    res.status(200).json({ challengeResponse: hash });
  } else if (req.method === "POST") {
    // Notification eBay (tu peux juste renvoyer 200 OK)
    res.status(200).send("OK");
  } else {
    res.status(405).send("Method not allowed");
  }
}
