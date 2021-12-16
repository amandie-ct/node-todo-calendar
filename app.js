// express app
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// listen for requests
app.listen(3001);


// connect to mongodb
// const mongoose = require('mongoose');

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
