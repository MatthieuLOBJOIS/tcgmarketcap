/**
 * Insert or update un bloc nettoyé dans la DB spécifique
 * @param {Object} data - Résultat de cleanData(set, 'set')
 * @param {mongoose.Model} SetModel - Modèle Mongoose pour la DB cible
 */

export const saveSetData = async (data, SetModel) => {
  const { set_id, cards, ...rest } = data

  if (!set_id) {
    console.error('❌ set_id manquant, impossible de sauvegarder')
    return
  }

  let existingSet = await SetModel.findOne({ set_id })

  if (!existingSet) {
    await new SetModel(data).save()
    console.log(`✅ Set ajouté: ${set_id}`)
    return
  }

  let modified = false

  // Mise à jour des champs simples du set
  for (const key of Object.keys(rest)) {
    if (existingSet[key] !== rest[key]) {
      existingSet[key] = rest[key]
      modified = true
    }
  }

  // Mise à jour ou ajout des cartes
  cards.forEach((newCard) => {
    const existingCard = existingSet.cards.find(
      (c) => c.card_id === newCard.card_id
    )

    if (existingCard) {
      for (const key of Object.keys(newCard)) {
        if (existingCard[key] !== newCard[key]) {
          existingCard[key] = newCard[key]
          modified = true
        }
      }
    } else {
      existingSet.cards.push(newCard)
      modified = true
    }
  })

  if (modified) {
    await existingSet.save()
    console.log(`🔄 Set mis à jour: ${set_id}`)
  } else {
    console.log(`⚡ Pas de modification nécessaire pour le set: ${set_id}`)
  }
}
