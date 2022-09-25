const { Router } = require('express');
const registerController = require('../controllers/register.controller');
const { validateUserRegistration } = require('../middlewares/register.validations');

const router = Router();

router.post('/', validateUserRegistration, registerController.register);

module.exports = router;