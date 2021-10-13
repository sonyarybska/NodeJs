const router = require('express').Router();

const {userMiddleware}=require('../middlewares');
const {userControllers}=require('../controllers');

router.get('/', userControllers.getUsers);
router.post('/', userMiddleware.isUserValid, userMiddleware.createUserMiddleware, userControllers.postUser);

router.get('/:id', userMiddleware.checkExistUser, userControllers.getUser);
router.put('/:id', userMiddleware.isUpdateValid, userMiddleware.checkExistUser, userControllers.updateUser);
router.delete('/:id', userMiddleware.checkExistUser, userControllers.deleteUser);

module.exports = router;
