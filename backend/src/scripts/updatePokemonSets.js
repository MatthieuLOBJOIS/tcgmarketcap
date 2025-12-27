import "dotenv/config";
import { updatePokemonSets } from "../services/pokemon/updatePokemonSets.service.js";

console.log("🔄 Démarrage de la mise à jour Pokémon...");

try {
  const result = await updatePokemonSets();

  switch (result.status) {
    case "UPDATED":
      console.log("✅ MISE À JOUR EFFECTUÉE");
      console.log("🕒 Nouvelle date :", result.lastUpdated);
      break;

    case "NO_UPDATE":
      console.log("🟡 AUCUNE MISE À JOUR NÉCESSAIRE");
      console.log("🕒 Dernière MAJ :", result.lastUpdated);
      break;

    default:
      console.log("ℹ️ État inconnu :", result);
  }

  process.exit(0);
} catch (error) {
  console.error("❌ ERREUR LORS DE LA MISE À JOUR");
  console.error("📛", error.message);
  process.exit(1);
}
