const express = require('express');
const router = express.Router();
const connection = require('../utils/connection.js');
const db = require('../utils/db.js');

function findItem(todos, itemId) {
    const result = todos.find(t => t.id === itemId);
    return result;
}

// Add routes 
router.get('/add', (req, res) => {
    res.render('add-todo')
})

// Note: comes first since .post('/:id') would accept request first
router.post('/add', (req, res) => {
const statusBool = req.body.status === "on" ? 1 : 0;
    db.addTask(connection,
        req.body.name,
        req.body.description,
        req.body.dueDate,
        statusBool,
        (err, results) => {
            if (err) throw err;
            res.redirect('/');
        });
});

// delete routes - forms only accept get and post
router.post('/delete/:id', (req, res) => {
    const idDelete = Number(req.params.id);
    
    db.getTaskById(connection, idDelete, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            res.send("Invalid ID");
        } else {
            db.deleteTask(connection, idDelete, (err, results) => {
                if (err) throw err;

                res.redirect('/');
            });
        };
    });
});

// Edit routes
router.get('/edit/:id', (req, res) => {
    const idEdit = Number(req.params.id);

    db.getTaskById(connection, idEdit, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            res.send('Invalid ID');
        } else {
            let todo = results[0];
            if (todo.due_date) {
                const year = todo.due_date.getFullYear();
                const month = String(todo.due_date.getMonth() + 1).padStart(2, '0');
                const day = String(todo.due_date.getDate()).padStart(2, '0');
                todo.due_date = `${year}-${month}-${day}`;
            }
            res.render('edit-todo', { todo });
        }
    });
});

router.post('/edit/:id', (req, res) => {
    const id = Number(req.params.id);
    const taskName = req.body.name;
    const taskDescription = req.body.description;
    const dateValue = req.body.dueDate || null;
    const status = req.body.status === 'on' ? 1 : 0;

    db.updateTask(connection, id, taskName, taskDescription, dateValue , status, (err, r) => {
        if (err) throw err;
        res.redirect('/');
    })
})


router.get('/search', (req, res) => {
    db.getAllTasks(connection, (err, tasks) => {
        if (err) throw err;
        
        const id = Number(req.query.id);
        let searchResult = null;
        let notFound = false;
        
        if (isNaN(id) || id <= 0) {
            notFound = true;
            res.render('todo-list', { todos: tasks, searchResult, notFound });
        } else {
            db.getTaskById(connection, id, (err, results) => {
                if (err) throw err;
                
                if (results.length > 0) {
                    searchResult = results[0];
                    // Format the date
                    if (searchResult.due_date) {
                        const year = searchResult.due_date.getFullYear();
                        const month = String(searchResult.due_date.getMonth() + 1).padStart(2, '0');
                        const day = String(searchResult.due_date.getDate()).padStart(2, '0');
                        searchResult.due_date = `${year}-${month}-${day}`;
                    }
                } else {
                    notFound = true;
                }
                
                res.render('todo-list', { todos: tasks, searchResult, notFound });
            });
        };
    });
});

// Display todo-list 
router.get('/', (req, res) => {
    db.getAllTasks(connection, (err, tasks) => {
        if (err) throw err;
        res.render('todo-list', { todos: tasks, searchResult: null, notFound: false });
    });
});

module.exports = router;