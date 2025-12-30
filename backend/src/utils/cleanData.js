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
    console.log(type)
  }
}

export default cleanData
