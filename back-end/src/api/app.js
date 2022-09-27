const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const authRouter = require('../router/auth.router');
const registerRouter = require('../router/register.router');
const productsRouter = require('../router/products.router');
const salesRouter = require('../router/sales.router');
const SalesProductsRouter = require('../router/salesProducts.router');
const adminRouter = require('../router/admin.router');
const userRouter = require('../router/user.router');
// const { verifyToken } = require('../utils/jwt.utilities');
const errorHandler = require('../middlewares/error.middleware');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/register', registerRouter);
app.use('/login', authRouter);
app.use('/images', express.static('public/images'));
// app.use(verifyToken);
app.use('/customer/products', productsRouter);
app.use('/customer/checkout', salesRouter);
app.use('/customer/orders', SalesProductsRouter);
app.use('/admin/manage', adminRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);

module.exports = app;
