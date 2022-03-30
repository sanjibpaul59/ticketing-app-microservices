import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
//Importing routes
import { currentUserRouter } from './routes/currentuser'
import { signUpRouter } from './routes/signup'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { allUsersRouter } from './routes/allusers'

// Middlewares
import { errorHandler, NotFoundError } from '@travingo/ticketing-common'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)
// Accessing the imported routes
app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(allUsersRouter)
app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
