import mongoose from "mongoose";

const SetsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // identifiant du bloc, ex: "sv"
    name: { type: String, required: true }, // nom du bloc, ex: "Écarlate et Violet"
    logo: { type: String }, // logo principal du bloc
    sets: [
      {
        id: { type: String, required: true }, // id de l'extension
        name: { type: String, required: true }, // nom de l'extension
        logo: { type: String }, // logo optionnel de l'extension
      },
    ],
  },
  {
    collection: "sets",
    versionKey: false,
  }
);

export default SetsSchema;
