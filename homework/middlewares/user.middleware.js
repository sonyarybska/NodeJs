const {Types} = require('mongoose');

const db = require('../dataBase/User');
const {ApiError} = require('../errors/ApiError');
const {userValidators: {createUserValidator, updateUserValidator}} = require('../validators');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await db.findOne({email});

            if (user) {
                return next({message:'User already exists',status:409});
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message,400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateValid: (req, res, next) => {
        try {
            const {error, value} = updateUserValidator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message,400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkExistUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await db.exists({_id: Types.ObjectId(id)});

            if (!user) {
                throw new ApiError('There is no such user',404);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
