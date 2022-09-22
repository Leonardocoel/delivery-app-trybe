const { Router } = require('express');
const registerController = require('../controllers/register.controller');
const validateRegisterFormat = require('../middlewares/register.validations');

const router = Router();

router.post('/', validateRegisterFormat.validateUserRegistration, registerController.register);

module.exports = router;