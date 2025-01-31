import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World from DALL.E' })
})

app.listen(8080, () => console.log('Server running on port 8080'))
