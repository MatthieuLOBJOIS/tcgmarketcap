import express from "express";
import dotenv from "dotenv";

import homeRoutes from "./routes/home.routes.js";
import ebayRoutes from "./routes/ebay.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", homeRoutes);
app.use("/ebay", ebayRoutes);

export default app;
