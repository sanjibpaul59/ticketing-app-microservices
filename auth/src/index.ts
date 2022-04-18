import mongoose from 'mongoose'
import { app } from './app'
// Database connection

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.AUTH_MONGO_URI) {
    throw new Error('AUTH_MONGO_URI must be defined')
  }

  try {
    await mongoose.connect(process.env.AUTH_MONGO_URI)
    console.log('Connected to Auth DB')
  } catch (error) {
    console.log(error)
  }
  // Listen to server
  app.listen(3000, () => {
    console.log('Listening on 3000!!!!!!')
  })
}

start()
