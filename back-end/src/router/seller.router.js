const { Router } = require('express');
const { verifyToken, verifaySeller } = require('../utils/jwt.utilities');
const sellerController = require('../controllers/seller.controller');

const router = Router();
router.use(verifyToken);
router.use(verifaySeller);
// router.get('/:id', adminController.getUserById);
router.get('/', sellerController.getAll);
// router.post('/', adminController.createUser);
// router.put('/:id', adminController.updateUser);
// router.delete('/:id', adminController.deleteUserById);

module.exports = router;