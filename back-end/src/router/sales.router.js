const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const sellerController = require('../controllers/seller.controller');

const router = Router();

router.get('/:id', salesController.getSaleById);
router.get('/', salesController.getAll);
router.post('/', salesController.createSale);
router.patch('/:id', sellerController.patchOrder);

module.exports = router;