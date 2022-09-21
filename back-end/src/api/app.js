const express = require('express');
require('express-async-errors');
const authRouter = require('../router/auth.router');
const registerRouter = require('../router/register.router');
const errorHandler = require('../middlewares/error.middleware');

const app = express();
app.use(express.json());

app.use('/login', authRouter);
app.use('/register', registerRouter);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);

module.exports = app;
