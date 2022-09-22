const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const authRouter = require('../router/auth.router');
const registerRouter = require('../router/register.router');
const productsRouter = require('../router/products.router');
const errorHandler = require('../middlewares/error.middleware');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/login', authRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);

module.exports = app;
