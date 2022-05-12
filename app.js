// express app
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const User = require('./models/User')

const app = express()

// connect to mongodb atlas
const dbURI = 'mongodb+srv://amandacarv:carv-060920@todo-calendar.jxpnq.mongodb.net/todo-calendar?retryWrites=true&w=majority'

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => app.listen(3001))
    .catch(err => console.log(err))
;

// middleware
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(cors())
app.use(bodyParser.json())


app.post('/todos/new', (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time
    })
    todo.save()
        .then((todo) => {
            res.send(todo)
        })
        .catch((err) => {
            console.log(err)
        })
})

// read todo
app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send(todos)
        })
        .catch((err) => {
            console.log(err)
        })
})

// delete todo
app.delete('/todos/:id', (req, res) => {
    Todo.findById()
    todoList.splice(todoid, 1);
    res.json();
})

// 'update' todo (set as done)
app.put('/todos/done/:id', (req, res) => {
    const todoid =  req.params.id;
    const todo = todoList[todoid];
    doneList.push(todo);
    todoList.splice(todoid, 1);
    res.json();
})
