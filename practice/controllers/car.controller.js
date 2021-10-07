const db = require('../dataBase/Car');

module.exports = {
    getCars: async (req, res) => {
        const cars = await db.find({});

        res.json(cars);
    },

    getCar: async (req, res) => {
        const cars = await db.findById(req.params.id);

        return res.json(cars);
    },

    postCar: async (req, res) => {
        await db.create(req.body);

        res.end('Car is added');
    },

    deleteCar: async (req, res) => {
        await db.deleteOne({_id:req.params.id});

        res.end('Car deleted');
    },

    updateCar: async (req, res) => {
        await db.updateOne({_id: req.params.id}, {$set: req.body});

        res.end('Car updated');
    }
};
