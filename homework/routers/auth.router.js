const router = require('express').Router();

const userMiddlewares = require('../middlewares/user.middleware');
const authControllers = require('../controllers/user.conrollers');

router.post('/', userMiddlewares.checkLogin, authControllers.authUsers);

module.exports = router;
