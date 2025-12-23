import crypto from "crypto";

const VERIFICATION_TOKEN =
  "db949e180ac8bfd72f03a5db7830eca732cf10b6f8ddd5f769b3c3066b3d5e0a";

const ENDPOINT =
  "https://tcgmarketcap-back.vercel.app/api/ebay/account-deletion";

export default function handler(req, res) {
  if (req.method === "GET") {
    const challengeCode = req.query.challenge_code;
    if (!challengeCode) {
      return res.status(400).send("Missing challenge_code");
    }

    const hash = crypto
      .createHash("sha256")
      .update(challengeCode)
      .update(VERIFICATION_TOKEN)
      .update(ENDPOINT)
      .digest("hex");

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      challengeResponse: hash,
    });
  }

  if (req.method === "POST") {
    // Notification eBay (suppression/fermeture de compte)
    return res.status(200).send("OK");
  }

  return res.status(405).send("Method not allowed");
}
