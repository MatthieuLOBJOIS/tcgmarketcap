import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const DATA_DIR = path.join(process.cwd(), "src/store/pokemon");

// ─────────────────────────────
// 🔹 GET /pokemon/blocs
// ─────────────────────────────
router.get("/blocs", (req, res) => {
  if (!fs.existsSync(DATA_DIR)) {
    return res.json([]);
  }

  const blocs = fs
    .readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  res.json(blocs);
});

// ─────────────────────────────
// 🔹 GET /pokemon/:bloc
// ─────────────────────────────
router.get("/:bloc", (req, res) => {
  const { bloc } = req.params;
  const metaPath = path.join(DATA_DIR, bloc, "meta.json");

  if (!fs.existsSync(metaPath)) {
    return res.status(404).json({
      error: `Bloc ${bloc} introuvable`,
    });
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  res.json(meta);
});

// ─────────────────────────────
// 🔹 GET /pokemon/:bloc/:set
// ─────────────────────────────
router.get("/:bloc/:set", (req, res) => {
  const { bloc, set } = req.params;

  const setPath = path.join(DATA_DIR, bloc, set, "cards.json");

  if (!fs.existsSync(setPath)) {
    return res.status(404).json({
      error: `Set ${set} introuvable dans le bloc ${bloc}`,
    });
  }

  const cards = JSON.parse(fs.readFileSync(setPath, "utf-8"));
  res.json(cards);
});

export default router;
