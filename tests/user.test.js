const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user') 
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)
 
// Create user test
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Alya',
        email: 'alya@example.com',
        password: 'alya1234#'       
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response 
    expect(response.body).toMatchObject({
        user: {
            name: 'Alya',
            email: 'alya@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('alya1234#')
})

// Login user test
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: '1234'
    }).expect(400)
})

// Authentication test
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// Unauthentication test
test('Should not get unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

// Delete user test
test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

// Upload image test
test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/wallhaven-617380.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// User update
test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Alya'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Alya')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Baku'
        })
        .expect(400)
})