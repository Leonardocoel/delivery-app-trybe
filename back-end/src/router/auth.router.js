const { Router } = require('express');
const validateReqFormat = require('../middlewares/requisition.validations');

const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/', validateReqFormat.validateUser, authController.login);

module.exports = router;