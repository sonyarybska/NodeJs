const router = require('express').Router();
const carMiddleware=require('../middlewars/car.middlewars');

const carControllers = require('../controllers/car.controller');

router.get('/', carControllers.getCars);
router.post('/',carMiddleware.checkUniqueBrand,carMiddleware.checkYear,carMiddleware.checkPrice, carControllers.postCar);

router.delete('/:id', carControllers.deleteCar);
router.get('/:id', carControllers.getCar);
router.put('/:id',carControllers.updateCar);


module.exports=router;
