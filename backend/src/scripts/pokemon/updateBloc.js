import mongoose from 'mongoose'
import { blocSchema } from '../../models/Bloc.js'
import connectDB from '../../config/db.js'

import TCGdex from '@tcgdex/sdk'
import cleanData from '../../utils/cleanData.js'
import { saveCleanData } from '../../utils/saveCleanData.js'

// récupérer les arguments : npm run update:bloc fr sv
const args = process.argv.slice(2)
const [lang, blocId] = args

if (!lang || !blocId) {
  console.error('❌ Usage: npm run update:bloc <lang> <blocId>')
  process.exit(1)
} else {
  console.log(
    `🔄 Import des sets Pokémon pour la langue: ${lang}, bloc: ${blocId}`
  )
}

// connexion DB
await connectDB()
const dbName = `pokemon_${lang}`
const BlocModel = mongoose.connection.useDb(dbName).model('Bloc', blocSchema)

const tcgdex = new TCGdex(lang)

console.log(`📦 Récupération de la série ${blocId}`)

const bloc = await tcgdex.serie.get(blocId)

const cleaned = cleanData(bloc, 'bloc')

// Enregistrer dans MongoDB
await saveCleanData(cleaned, BlocModel)

console.log('✅ Import terminé')
process.exit(0)
