import TCGdex from "@tcgdex/sdk";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

// npm run update:details sv sv08.5
const tcgdex = new TCGdex("fr");
const DATA_DIR = path.join(process.cwd(), "src/store/pokemon");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function updateDetails(blocId, setId) {
  const cardsPath = path.join(DATA_DIR, blocId, setId, "cards.json");
  const detailsPath = path.join(DATA_DIR, blocId, setId, "details.json");

  const cardsData = JSON.parse(await readFile(cardsPath, "utf-8"));
  const setInfo = await tcgdex.set.get(setId);

  const details = {};

  for (const card of cardsData.cards) {
    try {
      console.log(`🖌️ Details ${card.id}`);
      const fullCard = await tcgdex.card.get(card.id);

      details[card.id] = {
        rarity: fullCard.rarity ?? null,
        illustrator: fullCard.illustrator ?? null,
        category: fullCard.category ?? null,
        set: {
          id: setInfo.id,
          name: setInfo.name,
          logo: setInfo.logo,
        },
      };

      await sleep(100); // 🔥 limite API
    } catch (err) {
      console.warn(`⚠️ Erreur détails ${card.id}`, err.message);
    }
  }

  const newData = { updatedAt: new Date().toISOString(), cards: details };

  await writeIfChanged(detailsPath, newData);
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
      console.log("🟡 Details inchangés");
    }
  } catch {}

  if (shouldWrite) {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ Details mis à jour → ${filePath}`);
  }
}

// ─────────────────────────────
// ▶️ CLI
// ─────────────────────────────
const [blocId, setId] = process.argv.slice(2);

if (!blocId || !setId) {
  console.error("❌ Usage: npm run details <blocId> <setId>");
  process.exit(1);
}

await updateDetails(blocId, setId);
