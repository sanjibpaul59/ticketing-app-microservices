import request from 'supertest'
import { app } from '../../app'

it('response with details about current user', async () => {
  // const signupResponse
  // await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email: 'test@test.com',
  //     password: 'pass123',
  //   })
  //   .expect(201)
  // const cookie = signupResponse.get('Set-Cookie')
  const cookie = await global.signin()

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('returns null if user is not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(response.body.currentUser).toEqual(null)
})
