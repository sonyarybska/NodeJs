const router=require('express').Router();

const userControllers=require('../controllers/user.conrollers');

router.get('/', userControllers.getUsers);
router.post('/',userControllers.postUser);

router.get('/:id', userControllers.getUser);
router.delete('/:id', userControllers.deleteUser);

module.exports=router;