import { Router } from 'express'
import mongoose from 'mongoose'

import fs from 'fs'
import path from 'path'

const router = Router()
const DATA_DIR = path.join(process.cwd(), 'src/store/pokemon')
/*

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

// ─────────────────────────────
// 🔹 GET /pokemon/:bloc/:set/pricing
// ─────────────────────────────
router.get("/:bloc/:set/pricing", (req, res) => {
  const { bloc, set } = req.params;

  const pricingPath = path.join(DATA_DIR, bloc, set, "pricing.json");

  if (!fs.existsSync(pricingPath)) {
    return res.status(404).json({
      error: `Pricing introuvable pour ${set}`,
    });
  }

  const pricing = JSON.parse(fs.readFileSync(pricingPath, "utf-8"));
  res.json(pricing);
});

// ─────────────────────────────
// 🔹 GET /pokemon/:bloc/:set/details
// ─────────────────────────────
router.get("/:bloc/:set/details", (req, res) => {
  const { bloc, set } = req.params;

  const detailsPath = path.join(DATA_DIR, bloc, set, "details.json");

  if (!fs.existsSync(detailsPath)) {
    return res.status(404).json({
      error: `Details introuvables pour ${set}`,
    });
  }

  const details = JSON.parse(fs.readFileSync(detailsPath, "utf-8"));
  res.json(details);
}); */
/*
// GET /pokemon/:lang/blocs
router.get('/:lang/blocs', async (req, res) => {
  const { lang } = req.params // 'fr', 'jp', etc.

  try {
    const dbName = `pokemon_${lang}` // construit le nom de la DB dynamiquement
    const BlockModel = mongoose.connection
      .useDb(dbName)
      .model('Block', BlockSchema)

    const blocks = await BlockModel.find().lean()
    res.json(blocks)
  } catch (err) {
    console.error(`❌ Erreur récupération blocs ${req.params.lang}:`, err)
    res.status(500).json({ error: `Impossible de récupérer les blocs ${lang}` })
  }
})
*/
export default router
