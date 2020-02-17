require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  let user;
  beforeEach(async() => {
    user = await User.create({
      username: 'test',
      email: 'test@test.com',
      password: 'hype'
    });
  });

  it('creates a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'megaman',
        email: 'mega@man.com',
        password: 'rush'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'megaman',
          email: 'mega@man.com',
          __v: 0
        });
      });
  });

  it('logs a user in', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: 'hype'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          username: 'test',
          email: 'test@test.com',
          __v: 0
        });
      });
  });

  it('fails to log in with bad username', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'Megaman',
        email: 'test@test.com',
        password: 'hype'
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Username, Email, or Password',
          status: 401
        });
      });
  });

  it('fails to log in with bad email', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        email: 'mega@man.com',
        password: 'hype'
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Username, Email, or Password',
          status: 401
        });
      });
  });

  it('fails to log in with bad password', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: 'hypeee'
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Username, Email, or Password',
          status: 401
        });
      });
  });

  it('retrieves a logged in user with verify', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: 'hype'
      });

    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          username: 'test',
          email: 'test@test.com',
          __v: user.__v
        });
      });
  });
});
