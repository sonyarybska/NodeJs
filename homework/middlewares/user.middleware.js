const {Types} = require('mongoose');

const db = require('../dataBase/User');
const {updateUserValidator} = require('../validators/user.validator');
const {createUserValidator} = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await db.findOne({email});

            if (user) {
                throw new Error('User already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUpdateValid: (req, res, next) => {
        try {
            const {error, value} = updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
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

            req.body = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
