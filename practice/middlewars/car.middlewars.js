const db = require('../dataBase/Car');

module.exports = {
    checkUniqueBrand: async (req, res, next) => {
        const car = await db.find({brand: req.body.brand});
        try {
            if (car[0]?.brand) {
                throw new Error('Such model is exist');
            }
            next();

        } catch (e) {
            res.json(e.message);
        }
    },
    checkYear: (req, res,next) => {
        try {
            if (req.body.year < 1885 && req.body.year < 1980) {
                throw Error('Year must be between 1885 and 1980');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }

    },
    checkPrice: (req, res,next) => {
        try {
            if (req.body.price < 0) {
                throw Error('Price must be greater than 0');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
