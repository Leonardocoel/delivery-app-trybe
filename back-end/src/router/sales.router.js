const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const router = Router();

router.get('/:id', salesController.getSaleById);
router.get('/', salesController.getAll);
router.post('/', salesController.createSale);

module.exports = router;