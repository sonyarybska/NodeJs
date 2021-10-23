const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authContollers} = require('../controllers');
const {actionTokenEnum:{FORGOT_PASSWORD,ACTIVATE_USER}}=require('../constans');
const {authValidators,passwordValidator,mailValidator}=require('../validators');

router.post('/login',
    authMiddleware.isValid(authValidators.authValidator),
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
    authMiddleware.isValid(mailValidator.mailValidator),
    authMiddleware.checkExistUserByEmail,
    authContollers.forgotPassword
);

router.patch('/password/forgot',
    authMiddleware.isValid(passwordValidator.passwordValidator),
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authContollers.setPassword
);

module.exports = router;
