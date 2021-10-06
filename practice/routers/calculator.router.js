const router = require('express').Router();

const calcController = require('../controllers/calculator.controller');

router.get('/:num1/:operator/:num2', calcController.getResolve);

module.exports = router;
