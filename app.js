const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const employeeRouter = require('./routes/employee');

const app = express();

const port = process.env.PORT || 3300;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/

app.use('/employee', employeeRouter);

app.listen(port, () => {
    console.log(`App running on port: ${port}!`);
});

module.exports = app;
