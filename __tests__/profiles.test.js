require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Profile = require('../lib/models/Profile');
const User = require('../lib/models/User');

describe('profiles routes', () => {
  let agent;
  beforeAll(async() => {
    connect();
    agent = request.agent(app);

    await User
      .create({ 
        username: 'test',
        email: 'test@test.com',
        password: 'hype' 
      });

    await agent
      .post('/api/v1/auth/login')
      .send({ 
        username: 'test',
        email: 'test@test.com',
        password: 'hype'
      });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('requires authorization to post', () => {
    return request(app)
      .post('/api/v1/profiles')
      .send({
        name: 'Test',
        location: 'Salem, OR',
        dog: {
          name: 'Sparky',
          age: 8,
          weight: '20 lbs',
          breed: 'spaniel'
        },
        image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg'
      })
      .then(res => {
        expect(res.statusCode).toEqual(500);
      });
  });

  it('creates a new profile', () => {
    return agent
      .post('/api/v1/profiles')
      .send({
        name: 'Test',
        location: 'Salem, OR',
        dog: {
          name: 'Sparky',
          age: 8,
          weight: '20 lbs',
          breed: 'spaniel'
        },
        image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Test',
          location: 'Salem, OR',
          dog: {
            _id: expect.any(String),
            name: 'Sparky',
            age: 8,
            weight: '20 lbs',
            breed: 'spaniel'
          },
          image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg',
          userId: expect.any(String),
          __v: 0
        });
      });
  });

  it('requires authorzation to get', () => {
    return request(app)
      .get('/api/v1/profiles/all')
      .then(res => {
        expect(res.statusCode).toEqual(500);
      });
  });

  it('finds all profiles', () => {
    return agent
      .post('/api/v1/profiles')
      .send({
        name: 'Test',
        location: 'Salem, OR',
        dog: {
          name: 'Sparky',
          age: 8,
          weight: '20 lbs',
          breed: 'spaniel'
        },
        image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg'
      })
      .then(() => {
        return agent
          .get('/api/v1/profiles/all')
          .then(res => {
            expect(res.body).toEqual([{
              _id: expect.any(String),
              name: 'Test',
              location: 'Salem, OR',
              dog: {
                _id: expect.any(String),
                name: 'Sparky',
                age: 8,
                weight: '20 lbs',
                breed: 'spaniel'
              },
              image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg',
              userId: expect.any(String),
              __v: 0
            }]);
          });
      });
  });

  it('finds a profile by userId', () => {
    return agent
      .post('/api/v1/profiles')
      .send({
        name: 'Test',
        location: 'Salem, OR',
        dog: {
          name: 'Sparky',
          age: 8,
          weight: '20 lbs',
          breed: 'spaniel'
        },
        image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg'
      })
      .then(() => {
        return agent
          .get('/api/v1/profiles/user')
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              name: 'Test',
              location: 'Salem, OR',
              dog: {
                _id: expect.any(String),
                name: 'Sparky',
                age: 8,
                weight: '20 lbs',
                breed: 'spaniel'
              },
              image: 'https://thehappypuppysite.com/wp-content/uploads/2019/04/Cocker-Spaniel-Lifespan-long.jpg',
              userId: expect.any(String),
              __v: 0
            });
          });
      });
  });
});
