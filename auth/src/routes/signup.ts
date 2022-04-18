import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest, BadRequestError } from '@travingo/ticketing-common'

import { User } from '../models/user.model'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('username').trim().notEmpty().withMessage('Username must be valid'),
    body('email').isEmail().withMessage('Email Must be Valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage('Password must be between 4 and 16'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('Email in use!')
    }
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      throw new BadRequestError('Username already exists!')
    }
    const user = User.build({ username, email, password })
    await user.save()

    // Generate JsonWebToken
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )

    // Store it on a session object
    req.session = {
      jwt: userJwt,
    }
    res.status(201).send(user)
  }
)

export { router as signUpRouter }
