import 'ts-node/register/transpile-only' // Registra o ts-node antes de importar outros módulos
import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/dalle.routes.ts'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/generate', router)

app.listen(8080, () => console.log('Server running on port 8080'))
