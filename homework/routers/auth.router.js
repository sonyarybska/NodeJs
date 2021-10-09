const router = require('express').Router();

const {isUserValid} = require('../middlewares/user.middleware');
const {checkLogin} = require('../middlewares/auth.middleware');
const {authUsers} = require('../controllers/auth.controller');

router.post('/', isUserValid, checkLogin, authUsers);

module.exports = router;
