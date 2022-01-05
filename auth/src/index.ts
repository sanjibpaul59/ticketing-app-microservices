import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
//Importing routes
import { currentUserRouter } from './routes/currentuser'
import { signUpRouter } from './routes/signup'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'

// Middlewares
import { errorHandler } from './middlewares/error-handlers'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)
// Accessing the imported routes
app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/ticketing-auth')
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
  app.listen(3000, () => {
    console.log('Listening on 3000!!!!!!')
  })
}

start()
