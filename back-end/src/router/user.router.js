const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/:role', userController.getAllUsers);

module.exports = router;