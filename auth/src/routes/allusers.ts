import express, { Request, Response } from 'express'
import { User } from '../models/user.model'
const router = express.Router()

router.get('/api/users/allUsers', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
})
export { router as allUsersRouter }
