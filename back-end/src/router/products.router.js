const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();
router.get('/:id', productsController.getProductById);
router.get('/', productsController.getAll);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;