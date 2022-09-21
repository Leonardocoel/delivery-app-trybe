const { Router } = require('express');
const registerController = require('../controllers/register.controller');

const router = Router();

router.post('/', registerController.register);

module.exports = router;