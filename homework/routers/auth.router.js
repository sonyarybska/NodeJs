const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authContollers} = require('../controllers');

router.post('/', authMiddleware.isAuthValid, authMiddleware.checkLogin, authContollers.authUsers);

module.exports = router;
