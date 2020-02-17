const mongoose = require('mongoose');
const Profile = require('./Profile');

describe('Profile model', () => {
  it('requires a userId', () => {
    const profile = new Profile({
      name: 'Megaman',
      location: 'The Moon',
      dog: {
        name: 'Rush',
        age: 8,
        weight: '120 lbs',
        breed: 'robot'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.userId.message).toEqual('Path `userId` is required.');
  });

  it('requires a name', () => {
    const profile = new Profile({
      userId: '1234',
      location: 'The Moon',
      dog: {
        name: 'Rush',
        age: 8,
        weight: '120 lbs',
        breed: 'robot'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires a location', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      dog: {
        name: 'Rush',
        age: 8,
        weight: '120 lbs',
        breed: 'robot'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.location.message).toEqual('Path `location` is required.');
  });

  it('requires a dog', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      location: 'The Moon',
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.dog.message).toEqual('Path `dog` is required.');
  });

  it('requires a dog name', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      location: 'The Moon',
      dog: {
        age: 8,
        weight: '120 lbs',
        breed: 'robot'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.dog.message).toEqual('Validation failed: name: Path `name` is required.');
  });

  it('requires a dog age', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      location: 'The Moon',
      dog: {
        name: 'Rush',
        weight: '120 lbs',
        breed: 'robot'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.dog.message).toEqual('Validation failed: age: Path `age` is required.');
  });

  it('requires a dog weight', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      location: 'The Moon',
      dog: {
        name: 'Rush',
        age: 8,
        breed: 'robot'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.dog.message).toEqual('Validation failed: weight: Path `weight` is required.');
  });

  it('requires a dog breed', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      location: 'The Moon',
      dog: {
        name: 'Rush',
        age: 8,
        weight: '120 lbs'
      },
      image: 'https://i.pinimg.com/originals/c9/26/f8/c926f862b0a7311c9c324920760f1562.png'
    });

    const { errors } = profile.validateSync();
    expect(errors.dog.message).toEqual('Validation failed: breed: Path `breed` is required.');
  });

  it('requires an image', () => {
    const profile = new Profile({
      userId: '1234',
      name: 'Megaman',
      location: 'The Moon',
      dog: {
        name: 'Rush',
        age: 8,
        weight: '120 lbs',
        breed: 'robot'
      }
    });

    const { errors } = profile.validateSync();
    expect(errors.image.message).toEqual('Path `image` is required.');
  });
});
