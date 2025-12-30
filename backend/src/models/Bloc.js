import mongoose from 'mongoose'

const setSchema = new mongoose.Schema({
  set_id: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  name: String,
  cardCount: Number,
  logo: String,
  symbol: String,
  releaseDate: Date,
})

const blocSchema = new mongoose.Schema({
  bloc_id: { type: String, required: true, unique: true },
  enabled: { type: Boolean, default: true },
  name: String,
  logo: String,
  releaseDate: Date,
  sets: [setSchema],
})

// exporter le schema séparément pour pouvoir le réutiliser avec useDb
export { blocSchema, setSchema }

// exporter un modèle par défaut pour la DB principale
export const Bloc = mongoose.model('Bloc', blocSchema, 'blocs')
