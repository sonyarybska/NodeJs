const db = require('../dataBase/User');
const {Types} = require("mongoose");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const user = await db.findOne({email: req.body.email, password: req.body.password});

            if (user) {
                throw new Error('User already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkLogin: async (req, res, next) => {
        try {
            const user = await db.findOne({email: req.body.email, password: req.body.password});
            req.body = user;

            if (!user) {
                throw new Error('The login or password is incorrect');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkExistUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await db.exists({_id: Types.ObjectId(id)});

            if (!user) {
                throw new Error('There is no such user');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
