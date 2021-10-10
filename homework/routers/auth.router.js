const router = require('express').Router();

const {isAuthValid} = require('../middlewares/auth.middleware');
const {checkLogin} = require('../middlewares/auth.middleware');
const {authUsers} = require('../controllers/auth.controller');

router.post('/', isAuthValid, checkLogin, authUsers);

module.exports = router;
