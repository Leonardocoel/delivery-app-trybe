const { Router } = require('express');
const productsRouter = require('../controllers/products.controller');

const router = Router();
router.get('/', productsRouter.getAll);
module.exports = router;