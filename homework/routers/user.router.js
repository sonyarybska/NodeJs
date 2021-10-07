const router = require('express').Router();
const userMiddlewares=require('../middlewares/user.middleware');
const userControllers = require('../controllers/user.conrollers');

router.get('/', userControllers.getUsers);
router.post('/', userMiddlewares.createUserMiddleware,userControllers.postUser);

router.get('/:id', userControllers.getUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;
