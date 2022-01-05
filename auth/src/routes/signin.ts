import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user.model'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials')
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials!')
    }

    // Generate JsonWebToken
    const existingUserJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    )

    // Store it on a session object
    req.session = {
      jwt: existingUserJwt,
    }
    res.status(201).send(existingUser)
  }
)

export { router as signInRouter }
