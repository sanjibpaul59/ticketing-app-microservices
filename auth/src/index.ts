import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

//Importing routes
import { currentUserRouter } from './routes/currentuser'
import { signUpRouter } from './routes/signup'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'

// Middlewares
import { errorHandler } from './middlewares/error-handlers'
import { NotFoundError } from './errors/not-found-error'
const app = express()
app.use(json())

// Accessing the imported routes
app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Listening on 3000!!')
})
