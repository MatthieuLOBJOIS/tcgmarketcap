import { Router } from 'express'
import mongoose from 'mongoose'
import { blocSchema } from '../models/Bloc.js'

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

export default router
