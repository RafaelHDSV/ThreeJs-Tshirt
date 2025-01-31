import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// async function createOpenAIInstance() {
//   const image = await openai.images.generate({ prompt: 'A cute baby sea otter' })
//   console.log(image.data[0].url)
// }

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Dalle ROUTES!' })
})

router.route('/generate').post(async (req, res): Promise<void> => {
  const { prompt } = req.body // A requisição deve enviar um prompt
  if (!prompt) {
    res.status(400).json({ message: 'Prompt is required' })
    return
  }

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    const image = response.data[0].b64_json
    res.status(200).json({ photo: image })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// router.route('/generate').post(async (req, res) => {
//   try {
//     const { prompt } = req.body
//     const response = await openai.images.generate({ prompt, n: 1, size: '1024x1024', response_format: 'b64_json' })
//     const image = response.data[0].b64_json
//     res.status(200).json({ photo: image })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// })

export default router
