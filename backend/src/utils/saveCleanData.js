/**
 * Insert or update un bloc nettoyé dans la DB spécifique
 * @param {Object} cleanedData - Résultat de cleanData(bloc, 'bloc')
 * @param {mongoose.Model} BlocModel - Modèle Mongoose pour la DB cible
 */
export const saveCleanData = async (cleanedData, BlocModel) => {
  const { bloc_id, sets, ...rest } = cleanedData

  if (!bloc_id) {
    console.error('❌ bloc_id manquant, impossible de sauvegarder')
    return
  }

  // Vérifie si le bloc existe déjà
  let existingBloc = await BlocModel.findOne({ bloc_id })

  if (!existingBloc) {
    // Nouveau bloc → insert
    await new BlocModel(cleanedData).save()
    console.log(`✅ Bloc ajouté: ${bloc_id}`)
    return
  }

  let modified = false

  // Mise à jour des champs simples du bloc
  for (const key of Object.keys(rest)) {
    if (existingBloc[key] !== rest[key]) {
      existingBloc[key] = rest[key]
      modified = true
    }
  }

  // Mise à jour ou ajout des sets
  sets.forEach((newSet) => {
    const existingSet = existingBloc.sets.find(
      (s) => s.set_id === newSet.set_id
    )

    if (existingSet) {
      // Mise à jour seulement si une valeur a changé
      for (const key of Object.keys(newSet)) {
        if (existingSet[key] !== newSet[key]) {
          existingSet[key] = newSet[key]
          modified = true
        }
      }
    } else {
      // Nouveau set → push
      existingBloc.sets.push(newSet)
      modified = true
    }
  })

  if (modified) {
    await existingBloc.save()
    console.log(`🔄 Bloc mis à jour: ${bloc_id}`)
  } else {
    console.log(`⚡ Pas de modification nécessaire pour le bloc: ${bloc_id}`)
  }
}
