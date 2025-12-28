import TCGdex from "@tcgdex/sdk";
import { writeFile, mkdir, readFile } from "fs/promises";

const tcgdex = new TCGdex("fr");

async function fetchSerieToFile(blocId) {
  console.log(`📦 Récupération de la série ${blocId}`);

  const serie = await tcgdex.serie.get(blocId);
  const allSets = await tcgdex.fetch("sets");

  const serieSets = allSets.filter((set) => set.id.startsWith(blocId));

  console.log(`📁 ${serieSets.length} sets trouvés`);

  const blocDir = `src/store/pokemon/${blocId}`;
  await mkdir(blocDir, { recursive: true });

  // ─────────────────────────────
  // 🧠 META.JSON
  // ─────────────────────────────
  const metaData = {
    id: serie.id,
    name: serie.name,
    logo: serie.logo,
    sets: serieSets.map((set) => ({
      id: set.id,
      name: set.name,
      logo: set.logo,
    })),
  };

  await writeIfChanged(`${blocDir}/meta.json`, metaData);

  // ─────────────────────────────
  // 📦 SETS + CARTES
  // ─────────────────────────────
  for (const set of serieSets) {
    console.log(`⬇️ Fetch set ${set.id}`);

    const fullSet = await tcgdex.set.get(set.id);
    const cleanData = cleanSet(fullSet);

    const setDir = `${blocDir}/${set.id}`;
    await mkdir(setDir, { recursive: true });

    await writeIfChanged(`${setDir}/cards.json`, cleanData);
  }

  console.log(`✅ Bloc ${blocId} terminé`);
}

// ─────────────────────────────
// 🧹 CLEANERS
// ─────────────────────────────
function cleanSet(fullSet) {
  return {
    id: fullSet.id,
    name: fullSet.name,
    releaseDate: fullSet.releaseDate,
    logo: fullSet.logo,
    cards: fullSet.cards.map((card) => ({
      id: card.id,
      localId: card.localId,
      name: card.name,
      image: card.image,
      rarity: card.rarity ?? null,
    })),
  };
}

// ─────────────────────────────
// 💾 WRITE IF CHANGED
// ─────────────────────────────
async function writeIfChanged(filePath, newData) {
  let shouldWrite = true;

  try {
    const existing = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(existing);

    if (JSON.stringify(parsed) === JSON.stringify(newData)) {
      shouldWrite = false;
      console.log(`🟡 Inchangé → ${filePath}`);
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  if (shouldWrite) {
    await writeFile(filePath, JSON.stringify(newData, null, 2), "utf-8");
    console.log(`✅ Écrit → ${filePath}`);
  }
}

// 🔥 Lancement
const blocs = process.argv.slice(2);

if (blocs.length === 0) {
  console.error("❌ Usage: npm run monscript <blocId> [blocId...]");
  process.exit(1);
}

for (const blocId of blocs) {
  await fetchSerieToFile(blocId);
}
