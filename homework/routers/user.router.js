const {isUpdateValid} = require("../middlewares/user.middleware");
const router = require('express').Router();

const {isUserValid, checkExistUser, createUserMiddleware} = require('../middlewares/user.middleware');
const {getUser, getUsers, postUser, updateUser, deleteUser} = require('../controllers/user.conrollers');

router.get('/', getUsers);
router.post('/', isUserValid, createUserMiddleware, postUser);

router.get('/:id', checkExistUser, getUser);
router.put('/:id', isUpdateValid, checkExistUser, updateUser);
router.delete('/:id', checkExistUser, deleteUser);

module.exports = router;
