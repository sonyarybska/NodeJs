const db = require('../dataBase/Car');

module.exports = {
    getCars: async (req, res) => {
        const cars = await db.find({});

        res.json(cars);
    },

    getCar: async (req, res) => {
        const cars = await db.findOne({carId: +req.params.id});

        return res.json(cars);
    },

    postCar: async (req, res) => {
        const cars = await db.find({});

        const id = cars.find(value => value.carId);

        if (id) {
            await db.create({...req.body, carId: cars[cars.length - 1].carId + 1});
        } else {
            await db.create({...req.body, carId: 1});
        }

        res.end('Car is added');
    },

    deleteCar: async (req, res) => {
        await db.deleteOne({carId: +req.params.id});

        res.end('Car deleted');
    },

    updateCar: async (req, res) => {
        await db.updateOne({carId: +req.params.id}, {$set: req.body});

        res.end('Car updated');
    }
};
