const db = require('../dataBase/Car');

module.exports = {
    getCars: async (req, res) => {
        try{
            const cars = await db.find({});

            res.json(cars);   
        }
        catch(e){
            res.json(e.message);
        }
    },

    getCar: async (req, res) => {
        try{
            const cars = await db.findById(req.params.id);

            return res.json(cars);
        }
        catch(e){
            res.json(e.message);
        }
    },

    postCar: async (req, res) => {
        try{
            await db.create(req.body);

            res.end('Car is added');
        }
        catch(e){
            res.json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try{
            await db.deleteOne({_id:req.params.id});

            res.end('Car deleted');
        }
        catch(e){
            res.json(e.message);
        }
    },

    updateCar: async (req, res) => {
        try{
            await db.updateOne({_id: req.params.id}, {$set: req.body});

            res.end('Car updated');
        }
        catch(e){
            res.json(e.message);
        }
    }
};
