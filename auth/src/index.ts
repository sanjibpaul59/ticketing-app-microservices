import mongoose from 'mongoose'
import { app } from './app'
// Database connection

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
  // Listen to server
  app.listen(3000, () => {
    console.log('Listening on 3000!!!!!!')
  })
}

start()
