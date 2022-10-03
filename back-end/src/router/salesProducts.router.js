const { Router } = require('express');
const salesProductsController = require('../controllers/salesProducts.controller');

const router = Router();

router.get('/:id', salesProductsController.getSaleById);
router.get('/', salesProductsController.getAll);
router.patch('/:id', salesProductsController.patchOrder);

module.exports = router;