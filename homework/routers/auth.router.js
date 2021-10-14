const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authContollers} = require('../controllers');
const {userRole: {ADMIN, MANAGER}} = require('../constans');

router.post('/login',
    authMiddleware.isAuthValid,
    authMiddleware.checkLogin,
    authMiddleware.checkingRole([ADMIN, MANAGER]),
    authContollers.authUsers
);

module.exports = router;
