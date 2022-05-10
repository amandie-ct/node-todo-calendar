// express app
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// listen for requests
app.listen(3001);

// connect to mongodb atlas
const dbURI = 'mongodb+srv://amandacarv:carv-060920@todo-calendar.jxpnq.mongodb.net/todo-calendar?retryWrites=true&w=majority'

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => console.log('Connected to database'))
    .catch(err => console.log(err))
;

// middleware
app.use(express.urlencoded( {extended: true} ))
app.use(cors());
app.use(bodyParser.json());

// create todo
let todoList = [];
let doneList = [];

app.post('/todos/new', (req, res) => {
    console.log(req.body);
    todoList.push(req.body);

    res.json({
        success: true,
        doneList,
        todoList
    })
})

// read todo
app.get('/todos', (req, res) => {
    res.json(todoList);
})

// delete todo
app.delete('/todos/:id', (req, res) => {
    const todoid = req.params.id;
    todoList.splice(todoid, 1);
    res.json({todoList, doneList});
})

// 'update' todo (set as done)
app.put('/todos/done/:id', (req, res) => {
    const todoid =  req.params.id;
    const todo = todoList[todoid];
    doneList.push(todo);
    todoList.splice(todoid, 1);
    res.json({todoList, doneList});
})
