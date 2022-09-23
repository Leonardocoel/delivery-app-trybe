const { Router } = require('express');
const { verifyToken, verifyAccessPrivileges } = require('../utils/jwt.utilities');
const adminController = require('../controllers/admin.controller');

const router = Router();
router.use(verifyToken);
router.use(verifyAccessPrivileges);
router.get('/:id', adminController.getUserById);
router.get('/', adminController.getAll);
router.post('/', adminController.createUser);
router.put('/:id', adminController.updateUser);
router.delete('/:id', adminController.deleteUserById);

module.exports = router;