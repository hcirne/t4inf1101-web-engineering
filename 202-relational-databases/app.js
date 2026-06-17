const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const connection = require('./utils/connection.js');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }

    console.log('Connected to the database as id ' + connection.threadId);
});

function createTable(connection, queryString) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        due_date DATE,
        status_bool BOOL)`;
    connection.query(createTableQuery, (err, results) => {
        if (err) throw err;
        console.log('Table created');
    });
}

createTable(connection)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// logger middleware
function logger(req, res, next) {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

    fs.appendFile('access.log', logMessage, (err) => {
        if (err) console.error(err);
    });

    next();
}

app.use(logger);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes

const todoRouter = require('./router/router');
app.use('/', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
