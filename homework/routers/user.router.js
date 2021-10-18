const router = require('express').Router();

const {userMiddleware, authMiddleware} = require('../middlewares');
const {userControllers} = require('../controllers');
const {userValidators: {createUserValidator, updateUserValidator}} = require('../validators');
const {userRole: {ADMIN, MANAGER}} = require('../constans');

router.get('/', userControllers.getUsers);

router.post('/',
    userMiddleware.isBodyValid(createUserValidator),
    userMiddleware.createUserMiddleware,
    userControllers.postUser);

router.get('/:id',
    userMiddleware.isUserIdValid,
    userMiddleware.checkExistUser,
    userControllers.getUser);

router.put('/:id',
    userMiddleware.isUserIdValid,
    userMiddleware.isBodyValid(updateUserValidator),
    userMiddleware.checkExistUser,
    authMiddleware.checkAccessToken,
    userControllers.updateUser);

router.delete('/:id',
    userMiddleware.isUserIdValid,
    userMiddleware.checkExistUser,
    authMiddleware.checkingRole([ADMIN, MANAGER]),
    authMiddleware.checkAccessToken,
    userControllers.deleteUser);

module.exports = router;
