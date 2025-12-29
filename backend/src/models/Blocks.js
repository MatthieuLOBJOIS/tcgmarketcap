import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  {
    collection: "blocks", // nom exact de la collection
    versionKey: false, // supprime le champ __v
  }
);

export default BlockSchema;
