const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authContollers} = require('../controllers');
const {userRole: {ADMIN, MANAGER}} = require('../constans/');

router.post('/login',
    authMiddleware.isAuthValid,
    authMiddleware.checkingRole([ADMIN, MANAGER]),
    authMiddleware.checkLogin,
    authContollers.authUsers
);

module.exports = router;
