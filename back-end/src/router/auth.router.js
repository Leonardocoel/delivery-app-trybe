const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/', authController.login);

module.exports = router;