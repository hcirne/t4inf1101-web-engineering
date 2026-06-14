const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

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

const todoRouter = require('./router/list');
app.use('/', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});