import { Router } from "express";
import { searchEbay } from "../services/ebaySearch.service.js";

const router = Router();

router.get("/", searchEbay);

export default router;
