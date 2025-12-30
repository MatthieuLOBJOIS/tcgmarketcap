import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../../config/db.js'

import TCGdex from '@tcgdex/sdk'

import { blocSchema } from '../../models/Bloc.js'
import { setSchema } from '../../models/Set.js'

import cleanData from '../../utils/cleanData.js'
import { enrichCards } from '../../utils/enrichCards.js'
import { saveSetData } from '../../utils/saveSetData.js'

// récupérer les arguments : npm run update:set fr sv08.5
const args = process.argv.slice(2)
const [lang, setId] = args

if (!lang || !setId) {
  console.error('❌ Usage: npm run update:set <lang> <setId>')
  process.exit(1)
} else {
  console.log(
    `🔄 Import des cartes Pokémon pour la langue: ${lang}, set: ${setId}`
  )
}

await connectDB()

const db = mongoose.connection.useDb(`pokemon_${lang}`)
const BlocModel = db.models.Bloc || db.model('Bloc', blocSchema, 'blocs')

const bloc = await BlocModel.findOne(
  { 'sets.set_id': setId },
  { sets: { $elemMatch: { set_id: setId } } }
).lean()

const tcgdex = new TCGdex(lang)
const cards = await tcgdex.set.get(bloc.sets[0].set_id)

const cleanedSet = cleanData(cards, 'cards') // ta structure set + cards
const enrichedSet = await enrichCards(lang, cleanedSet)

// Sauvegarde dans MongoDB
await saveSetData(enrichedSet, db.model('Set', setSchema, 'sets'))

console.log('✅ Import terminé')
process.exit(0)
