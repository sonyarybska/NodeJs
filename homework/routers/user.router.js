const router = require('express').Router();

const {userMiddleware} = require('../middlewares');
const {userControllers} = require('../controllers');
const{userValidators:{createUserValidator,updateUserValidator}}=require('../validators');

router.get('/', userControllers.getUsers);
router.post('/', userMiddleware.isBodyValid(createUserValidator), userMiddleware.createUserMiddleware, userControllers.postUser);

router.get('/:id', userMiddleware.isUserIdValid, userMiddleware.checkExistUser, userControllers.getUser);
router.put('/:id', userMiddleware.isUserIdValid, userMiddleware.isBodyValid(updateUserValidator),
    userMiddleware.checkExistUser, userControllers.updateUser);
router.delete('/:id', userMiddleware.isUserIdValid, userMiddleware.checkExistUser, userControllers.deleteUser);

module.exports = router;
