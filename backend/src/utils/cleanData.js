const cleanData = (data, type) => {
  if (type === 'bloc') {
    const cleanSetsData = data.sets.map((set) => ({
      set_id: set.id,
      name: set.name,
      cardCount: set.cardCount?.total ?? null,
      logo: set.logo ?? null,
      symbol: set.symbol ?? null,
    }))
    return {
      bloc_id: data.id,
      name: data.name,
      logo: data.logo ?? null,
      releaseDate: data.releaseDate ?? null,
      sets: cleanSetsData,
    }
  }
  if (type === 'cards') {
    const cleanCardsData = data.cards.map((card) => ({
      card_id: card.id,
      name: card.name,
      localId: card.localId,
      image: card.image ?? null,
    }))
    return {
      set_id: data.id,
      name: data.name,
      logo: data.logo ?? null,
      releaseDate: data.releaseDate ?? null,
      cards: cleanCardsData,
      serie: data.serie?.id ?? null,
      abbreviation: data.abbreviation?.official ?? null,
    }
  }
}

export default cleanData
