const authRouter = require('./auth.router');
const registerRouter = require('./register.router');
const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');
const salesProductsRouter = require('./salesProducts.router');
const usersRouter = require('./users.router');
const adminRouter = require('./admin.router');

module.exports = {
  authRouter,
  registerRouter,
  productsRouter,
  salesRouter,
  salesProductsRouter,
  usersRouter,
  adminRouter,
};
