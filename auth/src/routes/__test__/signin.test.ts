import request from 'supertest'
import { app } from '../../app'

it('fails when a email does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pass123',
    })
    .expect(400)
})

it('fails when incorrect password supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pass123',
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pass',
    })
    .expect(400)
})

it('response with a cookie when valid credentials supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pass123',
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pass123',
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
