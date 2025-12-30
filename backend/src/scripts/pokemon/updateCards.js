import TCGdex from '@tcgdex/sdk'

// récupérer les arguments : npm run update:cards sv08.5
const args = process.argv.slice(2)
const [lang, blocId] = args

if (!lang || !blocId) {
  console.error('❌ Usage: npm run update:cards <lang> <blocId>')
  process.exit(1)
} else {
  console.log(
    `🔄 Import des sets Pokémon pour la langue: ${lang}, bloc: ${blocId}`
  )
}

const tcgdex = new TCGdex('fr')

const card = await tcgdex.card.get('sv08.5-136')

console.log(card)
