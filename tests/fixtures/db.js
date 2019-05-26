const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'nargiz',
    email: 'nargiz@example.com',
    password: 'nargiz1234@',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET, { expiresIn: '1h' })
    }] 
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'nigar',
    email: 'nigar@example.com',
    password: 'nigar1234@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET, { expiresIn: '1h' })
    }] 
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First test task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second test task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third test task',
    completed: false,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase,
}