// express app
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Model from './models/Todo';

const app = express();

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
app.use(cors());
app.use(bodyParser.json());


app.post('/todos/new', (req, res) => {
    const todo = new Model({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time
    })
    todo.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
        res.json({
        success: true,
    })
})

// read todo
app.get('/todos', (req, res) => {
    await Model.find()
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
