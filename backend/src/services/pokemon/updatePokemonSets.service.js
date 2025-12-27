import fs from "fs";
import path from "path";
import { hashData } from "../../utils/hash.util.js";

export async function updatePokemonSets() {
  if (!process.env.JUST_TCG_API_KEY) {
    throw new Error("JUST_TCG_API_KEY manquante");
  }

  const filePath = path.join(process.cwd(), "src/store/pokemon/sets.json");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  let cachedResponse = null;
  let cachedHash = null;
  let lastUpdated = null;

  // 🔁 Lecture cache
  if (fs.existsSync(filePath)) {
    try {
      const cachedFile = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      cachedResponse = cachedFile.response;
      cachedHash = hashData(cachedResponse);
      lastUpdated = cachedFile.lastUpdated;
    } catch {
      console.warn("⚠️ Cache corrompu, reconstruction...");
    }
  }

  // 🌍 Appel API
  const response = await fetch(
    "https://api.justtcg.com/v1/sets?game=pokemon&orderBy=release_date",
    {
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.JUST_TCG_API_KEY, // ✅ CORRECT
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API JustTCG HTTP ${response.status}`);
  }

  const apiResponse = await response.json();

  // 🚨 NE JAMAIS CACHER UNE ERREUR API
  if (apiResponse?.error) {
    throw new Error(
      `API JustTCG error: ${apiResponse.error} (${apiResponse.code})`
    );
  }

  const apiHash = hashData(apiResponse);

  // 🧠 Comparaison
  if (apiHash === cachedHash) {
    return {
      status: "NO_UPDATE",
      message: "Aucune modification détectée",
      lastUpdated,
    };
  }

  // 💾 Écriture
  const payload = {
    source: "justtcg",
    lastUpdated: new Date().toISOString(),
    response: apiResponse,
  };

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");

  return {
    status: "UPDATED",
    message: "Données Pokémon mises à jour",
    lastUpdated: payload.lastUpdated,
  };
}
