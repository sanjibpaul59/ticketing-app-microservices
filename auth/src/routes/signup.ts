import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/db-validation-error'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email Must be Valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage('Password must be between 4 and 16'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body
    console.log('Creating a User')
    throw new DatabaseConnectionError()
    res.send({})
  }
)

export { router as signUpRouter }
