const { Router } = require('express');
const imageController = require('../controllers/image.controller');

const router = Router();

router.get('/:path', imageController.imageController);

module.exports = router;
