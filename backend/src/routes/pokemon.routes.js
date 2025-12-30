import { Router } from 'express'
import mongoose from 'mongoose'

import { blocSchema } from '../models/Bloc.js'
import { setSchema } from '../models/Set.js'

const router = Router()

// GET /pokemon/:lang/blocs
router.get('/:lang/blocs', async (req, res) => {
  const { lang } = req.params

  try {
    const dbName = `pokemon_${lang}`
    const db = mongoose.connection.useDb(dbName)

    // Réutilise le modèle s'il existe déjà
    const BlocModel = db.models.Bloc || db.model('Bloc', blocSchema, 'blocs')

    const blocs = await BlocModel.find({ enabled: true }).lean()

    res.json(blocs)
  } catch (err) {
    console.error(`❌ Erreur récupération blocs ${lang}:`, err)
    res.status(500).json({
      error: `Impossible de récupérer les blocs ${lang}`,
    })
  }
})

// GET /pokemon/:lang/sets
router.get('/:lang/sets', async (req, res) => {
  const { lang } = req.params

  try {
    const db = mongoose.connection.useDb(`pokemon_${lang}`)
    const SetModel = db.model('Set', setSchema, 'sets')

    const sets = await SetModel.find(
      {},
      { cards: 0 } // exclure les cartes
    ).lean()

    res.json(sets)
  } catch (err) {
    console.error(`❌ Erreur récupération sets (${lang})`, err)
    res.status(500).json({ error: 'Erreur récupération sets' })
  }
})

// GET /pokemon/:lang/sets/:setId
router.get('/:lang/sets/:setId', async (req, res) => {
  const { lang, setId } = req.params

  try {
    const db = mongoose.connection.useDb(`pokemon_${lang}`)
    const SetModel = db.model('Set', setSchema, 'sets')

    const set = await SetModel.findOne({ set_id: setId }).lean()

    if (!set) {
      return res.status(404).json({ error: 'Set introuvable' })
    }

    res.json(set)
  } catch (err) {
    console.error(`❌ Erreur récupération set ${setId}`, err)
    res.status(500).json({ error: 'Erreur récupération set' })
  }
})

// GET /pokemon/:lang/cards/:cardId
router.get('/:lang/cards/:cardId', async (req, res) => {
  const { lang, cardId } = req.params

  try {
    const db = mongoose.connection.useDb(`pokemon_${lang}`)
    const SetModel = db.model('Set', setSchema, 'sets')

    const set = await SetModel.findOne(
      { 'cards.card_id': cardId },
      { 'cards.$': 1, set_id: 1, name: 1 }
    ).lean()

    if (!set || !set.cards?.length) {
      return res.status(404).json({ error: 'Carte introuvable' })
    }

    res.json({
      set_id: set.set_id,
      set_name: set.name,
      card: set.cards[0],
    })
  } catch (err) {
    console.error(`❌ Erreur récupération carte ${cardId}`, err)
    res.status(500).json({ error: 'Erreur récupération carte' })
  }
})

export default router
