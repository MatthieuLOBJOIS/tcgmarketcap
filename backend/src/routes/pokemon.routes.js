import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/sets", (req, res) => {
  const filePath = path.join(process.cwd(), "src/store/pokemon/sets.json");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: "Les données Pokémon ne sont pas encore disponibles",
    });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

export default router;
