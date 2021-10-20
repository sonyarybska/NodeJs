const router = require('express').Router();

const {userMiddleware, actionMiddleware} = require('../middlewares');
const {passwordConroller} = require('../controllers');

router.post('/forgot/:id',
    userMiddleware.checkExistUser,
    passwordConroller.forgot
);

router.post('/set',
    actionMiddleware.isPasswordValid,
    actionMiddleware.checkActionToken,
    passwordConroller.setPassword
);

module.exports = router;
