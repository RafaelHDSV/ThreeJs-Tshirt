import express from 'express'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

router.route('/').post(async (req, res): Promise<void> => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      res.status(400).json({ message: 'Prompt is required' })
      return
    }

    console.log('Generating image with prompt:', prompt)

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    const image = response.data[0]?.b64_json
    if (!image) {
      console.error('Image generation failed:', response)
      throw new Error('Image generation failed')
    }

    res.status(200).json({ photo: image })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err })
  }
})

export default router
