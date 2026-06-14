const express = require('express');
const router = express.Router();
let { todos } = require('../data.js')

let nextId = 3;

function findItem(todos, itemId) {
    const result = todos.find(t => t.id === itemId);
    return result;
}


router.get('/', (req, res) => {
    let searchResult = null;
    let notFound = false; 

    if (req.query.id) {
        const id = Number(req.query.id);
        searchResult = findItem(todos, id);
        if (searchResult === undefined) {
            notFound = true;
        }
    }
    res.render('todo-list', { todos, searchResult, notFound });
})

router.post('/', (req, res) => {
    const newTodo = {
        id: nextId,
        title: req.body.title,
        description: req.body.description,
        done: false,
    };
    nextId++;
    todos.push(newTodo);
    res.status(201).redirect('/')
});

router.get('/:id', (req, res) => {
    const todo = findItem(todos, Number(req.params.id));
    if (todo === undefined) {
        res.send("Invalid ID");
    } else {
        res.json(todo);
    }
});

router.post('/:id', (req, res) => {
    const idDelete = Number(req.params.id);
    const todo = findItem(todos, idDelete);
    if (todo === undefined) {
        res.status(404).json({ message: "Invalid ID" }).redirect('/')
    } else {
        todos = todos.filter(t => t.id !== idDelete);
        res.status(200).redirect('/');
    }
});

router.get('/edit/:id', (req, res) => {
    const todo = findItem(todos, Number(req.params.id));
    if (todo === undefined) {
        res.send('Invalid ID');
    } else {
        res.render('edit-todo.ejs', {todo});
    }
})

router.post('/edit/:id', (req, res) => {
    const idEdit = Number(req.params.id);
    let todo = findItem(todos, idEdit);
    if (todo === undefined) {
        res.send('Invalid ID');
    } else {
        todo.title = req.body.title;
        todo.description= req.body.description;
        req.body.done === undefined ? todo.done = undefined : todo.done = "on";
        console.log(req.body.done)
        console.log(todo)
        res.redirect('/');
    }
})

module.exports = router;