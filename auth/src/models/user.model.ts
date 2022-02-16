import mongoose from 'mongoose'
import { Password } from '../services/password'

// An Interface that describes the properties
// that are required to create new User
interface UserAttrs {
  email: string
  password: string
}

// An interface that describes the properties
// a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

// Final solution for TS and mongoose to work along
// Here only User is exported and all the type checks are done here

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}
const User = mongoose.model<UserDoc, UserModel>('User', UserSchema)

export { User }

// Using a helper function for TS and mongoose to get along
// Here need to export the function
// buildUser function need to be used anytime to create a new user

/*
const buildUser = (attrs:UserAttrs) => {
  return new User(attrs)
}
export {User, buildUser}
*/
