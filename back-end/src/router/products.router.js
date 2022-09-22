const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();
router.get('/:id', productsController.getById);
router.get('/', productsController.getAll);
module.exports = router;