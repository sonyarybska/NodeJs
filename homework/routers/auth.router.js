
const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authContollers} = require('../controllers');
const {actionTokenEnum:{FORGOT_PASSWORD,ACTIVATE_USER}}=require('../constans');

router.post('/login',
    authMiddleware.isAuthValid,
    authMiddleware.checkLogin,
    authContollers.login
);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authContollers.logout
);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authContollers.refresh
);

router.post('/activate',
    authMiddleware.checkActionToken(ACTIVATE_USER),
    authContollers.activate
);


router.post('/password/forgot',
    authMiddleware.checkExistUserByEmail,
    authContollers.forgotPassword
);

router.post('/password/set',
    authMiddleware.isPasswordValid,
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authContollers.setPassword
);

module.exports = router;
