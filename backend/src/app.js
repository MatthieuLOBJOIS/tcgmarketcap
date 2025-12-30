import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'

import homeRoutes from './routes/home.routes.js'
import ebayRoutes from './routes/ebay.routes.js'
import pokemonRoutes from './routes/pokemon.routes.js'

const app = express()

app.use(express.json())

connectDB()

app.use('/', homeRoutes)
app.use('/ebay', ebayRoutes)
//app.use('/pokemon', pokemonRoutes)

export default app
