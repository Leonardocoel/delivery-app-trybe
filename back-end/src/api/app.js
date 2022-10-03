const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('../router');

const { verifyToken } = require('../utils/jwt.utilities');
const errorHandler = require('../middlewares/error.middleware');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/images', express.static('public/images'));
app.use('/register', routes.registerRouter);
app.use('/login', routes.authRouter);

app.use(verifyToken);
app.use('/products', routes.productsRouter);
app.use('/sales', routes.salesRouter);
app.use('/orders', routes.salesProductsRouter);
app.use('/users', routes.usersRouter);
app.use('/admin/manage', routes.adminRouter);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);

module.exports = app;
