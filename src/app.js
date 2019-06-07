const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express() 


// Test code
app.use((req, res, next) => {
    // console.log(req.method, req.path, req.connection.remoteAddress)
    /* if (req.method === 'GET') {
        res.send('GET requests are disabled')
    } else {
        next()
    } */
    next()
})

// Test code
/* app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon')
}) */

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


 

// Test code
/* const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    const task = await Task.findById('5cdfc857055c7e2bd80f7598')
    await task.populate('owner').execPopulate()
    console.log(task.owner)

    const user = await User.findById('5cdfc6e3f188a20d9cc5ad65')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main() */

module.exports = app