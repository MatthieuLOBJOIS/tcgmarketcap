// Importation des modules
import express from "express";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bonjour, ceci est un message JSON !" });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
