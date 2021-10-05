const router=require('express').Router();
const userControllers=require('../controllers/user.conrollers');

router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUser);
router.post("/",userControllers.postUser);

module.exports=router;