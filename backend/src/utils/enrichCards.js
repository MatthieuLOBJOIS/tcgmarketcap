import TCGdex from '@tcgdex/sdk'

export const enrichCards = async (lang, set) => {
  const tcgdex = new TCGdex(lang)

  const enrichedCards = await Promise.all(
    set.cards.map(async (card) => {
      const detailed = await tcgdex.card.get(card.card_id)
      return {
        ...card,
        category: detailed.category,
        rarity: detailed.rarity,
        illustrator: detailed.illustrator,
        fullDetails: true,
      }
    })
  )

  // Retourne le set complet avec les cartes enrichies
  return {
    ...set,
    cards: enrichedCards,
  }
}
