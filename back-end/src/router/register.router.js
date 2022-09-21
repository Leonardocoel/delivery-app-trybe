const { Router } = require('express');
const authController = require('../controllers/register.controller');

const router = Router();

router.post('/', authController.register);

module.exports = router;