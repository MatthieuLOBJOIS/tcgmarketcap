import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ACCESS_TOKEN = process.env.EBAY_ACCESS_TOKEN; // stockez le token dans .env

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bonjour, ceci est un message JSON !" });
});

// Route pour interroger eBay
app.get("/ebay", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.ebay.com/buy/browse/v1/item_summary/search?q=charizard&filter=soldItemsOnly:true",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_FR",
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Erreur lors de la récupération des données eBay" });
    }

    const data = await response.json();
    res.json(data.itemSummaries || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
