import TCGdex from "@tcgdex/sdk";
import { readFile, writeFile } from "fs/promises";
import path from "path";
//npm run update:pricing sv sv08.5
const tcgdex = new TCGdex("fr");
const DATA_DIR = path.join(process.cwd(), "src/store/pokemon");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function updatePricing(blocId, setId) {
  const cardsPath = path.join(DATA_DIR, blocId, setId, "cards.json");
  const pricingPath = path.join(DATA_DIR, blocId, setId, "pricing.json");

  const cardsData = JSON.parse(await readFile(cardsPath, "utf-8"));

  const pricing = {};

  for (const card of cardsData.cards) {
    try {
      console.log(`💰 Pricing ${card.id}`);
      const fullCard = await tcgdex.card.get(card.id);

      pricing[card.id] = {
        cardmarket: fullCard.pricing?.cardmarket ?? null,
        tcgplayer: fullCard.pricing?.tcgplayer ?? null,
      };

      await sleep(200); // 🔥 limite API
    } catch {
      console.warn(`⚠️ Erreur pricing ${card.id}`);
    }
  }

  const newData = {
    updatedAt: new Date().toISOString(),
    cards: pricing,
  };

  await writeIfChanged(pricingPath, newData);
}

// ─────────────────────────────
// 💾 Write if changed
// ─────────────────────────────
async function writeIfChanged(filePath, data) {
  let shouldWrite = true;

  try {
    const existing = JSON.parse(await readFile(filePath, "utf-8"));
    if (JSON.stringify(existing.cards) === JSON.stringify(data.cards)) {
      shouldWrite = false;
      console.log("🟡 Pricing inchangé");
    }
  } catch {}

  if (shouldWrite) {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ Pricing mis à jour`);
  }
}

// ─────────────────────────────
// ▶️ CLI
// ─────────────────────────────
const [blocId, setId] = process.argv.slice(2);

if (!blocId || !setId) {
  console.error("❌ Usage: npm run pricing <blocId> <setId>");
  process.exit(1);
}

await updatePricing(blocId, setId);
