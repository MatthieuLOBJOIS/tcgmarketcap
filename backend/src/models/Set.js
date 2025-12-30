import mongoose from 'mongoose'

// Schema pour une carte
const cardSchema = new mongoose.Schema({
  card_id: { type: String, required: true },
  name: { type: String, required: true },
  localId: String,
  image: String,
  category: String,
  rarity: String,
  illustrator: String,
  fullDetails: { type: Boolean, default: false }, // indique si la carte a été enrichie
})

// Schema pour un set
const setSchema = new mongoose.Schema({
  set_id: { type: String, required: true },
  name: { type: String, required: true },
  logo: String,
  releaseDate: Date,
  abbreviation: String,
  serie: String,
  cards: [cardSchema], // tableau de cartes
  enabled: { type: Boolean, default: true },
})

// Exporter les schemas pour pouvoir les réutiliser
export { setSchema, cardSchema }

// Exporter un modèle pour la DB principale
export const Set = mongoose.model('Set', setSchema, 'sets')
