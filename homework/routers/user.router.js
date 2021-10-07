const router = require('express').Router();

const userMiddlewares = require('../middlewares/user.middleware');
const userControllers = require('../controllers/user.conrollers');

router.get('/', userControllers.getUsers);
router.post('/', userMiddlewares.createUserMiddleware, userControllers.postUser);

router.get('/:id', userMiddlewares.checkExistUser, userControllers.getUser);
router.delete('/:id',userMiddlewares.checkExistUser, userControllers.deleteUser);

module.exports = router;
