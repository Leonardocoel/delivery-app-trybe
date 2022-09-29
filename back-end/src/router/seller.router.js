const { Router } = require('express');
const { verifyToken, verifySeller } = require('../utils/jwt.utilities');
const sellerController = require('../controllers/seller.controller');

const router = Router();
router.use(verifyToken);
router.use(verifySeller);
router.get('/:id', sellerController.getOrderById);
router.get('/', sellerController.getAll);
router.patch('/:id', sellerController.patchOrder);

module.exports = router;